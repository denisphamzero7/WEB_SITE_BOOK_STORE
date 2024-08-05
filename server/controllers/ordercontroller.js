 const Order = require('../models/order')
const User = require("../models/user");
 const Coupon = require("../models/coupon"); 
const asyncHandler = require('express-async-handler')

const Product = require("../models/product"); 





// create a new Order 

const createOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { products, total, address, status } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No products in the order",
    });
  }

  if (address) {
    await User.findByIdAndUpdate(id, { address, cart: [] });
  }

  // Check and update product stock quantities
  for (const item of products) {
    const product = await Product.findById(item.product);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${item.product} not found`,
      });
    }

    if (product.quantity < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for product ${product.name}`,
      });
    }

    product.quantity -= item.quantity;
    await product.save();
  }

  const data = { products, total, address, orderBy: id };
  if (status) data.status = status;

  const rs = await Order.create(data);
  res.status(200).json({
    success: true,
    data: rs,
  });
});


// update status
const updateStatus = asyncHandler(async(req, res) => {
    const {oid} = req.params;
    console.log('object');
    const {status}= req.body;
     if(!status) throw new Error('missing input')
     const response = await Order.findByIdAndUpdate(oid,{status},{new:true})
   
     
     res.status(200).json({
        sucess: response?true:false,
        data: response ? response :'not updated',
     })
})
const getAnOrder = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  console.log('Fetching order with ID:', oid); // Debug log

  try {
    const order = await Order.findById(oid)
      .populate({
        path: 'products.product',
        select: 'name images price quantity'
      })
      .populate('orderBy', 'firstname lastname'); // Populate orderBy field with user details

    if (!order) {
      console.log('Order not found'); // Debug log
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    console.log('Order found:', order); // Debug log
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error fetching order:', error); // Debug log
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
})


const getUserOrder = asyncHandler(async(req, res) => {
    const queries = { ...req.query };
    const {id}= req.user
    // tach cac truong dac biet ra khoi query
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((el) => delete queries[el]);
    // format lai cac operator dung cu phap mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (matchedEl) => `$${matchedEl}`
    );
    const formatedqueries = JSON.parse(queryString);
    
    const qr ={...formatedqueries,orderBy:id}
    let queryCommand = Order.find(qr);
    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }
    // fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryCommand = queryCommand.select(fields);
    }
    // panigration
    //limit : object lay ve 1 goi api
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;
    queryCommand
      .skip(skip)
      .limit(limit)
      .populate({
        path:'products',
        populate:{
         path:'product',
         select:'name images price quantity',
        }
       });
  
    // execute query
    try {
      const response = await queryCommand.exec();
      const counts = await Order.find(formatedqueries).countDocuments();
  
      return res.status(200).json({
        success: response.length > 0,
        orders: response || "can not get Order",
        counts,
      });
    } catch (error) {
      throw new Error(error.message);
    }
});


const getOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);
  // Format lại các toán tử query theo cú pháp của Mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formattedQueries = JSON.parse(queryString);
  
  // Xây dựng query để lấy danh sách đơn hàng
  let queryCommand = Order.find(formattedQueries);
  queryCommand = queryCommand.populate({
    path: 'orderBy',
    select: 'firstname lastname', // Chọn các trường bạn muốn hiển thị
  });

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  queryCommand
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'products',
      populate: {
        path: 'product',
        select: 'name images price quantity',
      }
    })

  // Execute query
  try {
    const response = await queryCommand.exec();
    const counts = await Order.countDocuments(formattedQueries);

    return res.status(200).json({
      success: response.length > 0,
      orders: response || "can not get Order",
      counts,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});


module.exports = {
    createOrder,updateStatus,getUserOrder,getOrders,getAnOrder
};