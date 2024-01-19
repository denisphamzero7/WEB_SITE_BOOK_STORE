 const Order = require('../models/order')
const User = require("../models/user");
 const Coupon = require("../models/coupon"); 
const asyncHandler = require('express-async-handler')


// create a new Order 

const createOrder = asyncHandler(async(req, res) => {
    const {id} = req.user;
    const {coupon}= req.body;
   console.log(req.user,'fhf');
     const currentUser = await User.findById(id).select('name');
     const usercart = await User.findById(id).select('cart').populate('cart.product','name , price')
     console.log(usercart);
     const products =    usercart?.cart.map(el=> ({
        product: el.product.pid,
        count: el.quantity,
        color: el.color
     }));
     let total =  usercart?.cart.reduce((sum,el)=> el.product.price * el.quantity + sum,0 );
     const createdata = {products,total,orderBy:id, userName: currentUser?.name }
     if(coupon) {
        const selectCoupon = await Coupon.findById(coupon)
        total = Math.round(total *(1 - +selectCoupon?.discount /100)/1000 )*1000 || total
        createdata.total =total
        createdata.coupon =coupon
     }
     const rs = await Order.create(createdata)
     res.status(200).json({
        status: true?true:false,
        data: rs ? rs: 'not created',
     })
})
// update status
const updateStatus = asyncHandler(async(req, res) => {
    const {oid} = req.params;
    const {status}= req.body;
     if(!status) throw new Error('missing input')
     const response = await Order.findByIdAndUpdate(oid,{status},{new:true})
   
     
     res.status(200).json({
        sucess: response?true:false,
        data: response ? response :'not updated',
     })
})

const getUserOrder = asyncHandler(async(req, res) => {
    const {id} =req.user;
    console.log(req.user,'cn');
    const response = await Order.find({orderBy:id})
    console.log(response,'djdj');
    res.status(200).json({
      success: response?true:false,
      rs:response?response:'some thing wrong'
    })
});
const getOrders = asyncHandler(async(req, res) => {
    
    const response = await Order.find();
    
    res.status(200).json({
        success: response ? true : false,
        rs: response ? response : 'something went wrong',
    });
});

module.exports = {
    createOrder,updateStatus,getUserOrder,getOrders
};