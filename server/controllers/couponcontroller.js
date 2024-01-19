const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')


// create a new Coupon

const createcoupon = asyncHandler(async(req, res) => {
    const {name,discount,expiry} = req.body
    if(!name || !discount||!expiry) throw new Error('Missing input')
     const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + + expiry*24*60*60*1000
     })
     res.status(200).json({
        status: true?true:false,
        data: response?response: 'not created',
     })
})
// get coupons
const getcoupons = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt')
    res.status(200).json({
        success: response.length >0 ? true : false,
        data: response.length >0 ? response : 'not found coupon'
    });
});
// get an coupon
const getcoupon = asyncHandler(async (req, res) =>{
    const {cpid} = req.params
    const response = await Coupon.findById(cpid).select('-createdAt -updatedAt')
    res.status(200).json({
      success: true ? true : false,
      data: response ? response : 'not found a coupon'  
    })
})

// update coupon
const updatedcoupon = asyncHandler(async (req, res) => {
    const { cpid } = req.params;
    if(Object.keys(req.body).length===0) throw new Error('missing input')
    if(req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry*24*60*60*1000;
    const response = await Coupon.findByIdAndUpdate(cpid, req.body, { new: true });
    res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'can not update coupon'
    });
});

// delete coupon
const deletecoupon = asyncHandler(async (req, res) => {
    const { cpid } = req.params;
    if(!cpid) return new Error('Invalid');
    const response = await Coupon.findByIdAndDelete(cpid);
    res.status(200).json({
        success: response ? true : false,
        data: response ? 'delete success' : 'can not update coupon'
    });
});

module.exports = {
    createcoupon,
    getcoupons,
    getcoupon,
    updatedcoupon,
    deletecoupon,

};