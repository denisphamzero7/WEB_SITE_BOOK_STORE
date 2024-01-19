const productcategory = require('../models/productcategory');
const asyncHandler = require('express-async-handler');

// Tạo danh mục sản phẩm
const postproductcategory = asyncHandler(async (req, res) => {
    const {title}= req.body;
    if (!title) throw new Error('missing inputsđ');
    console.log(title);
    const response = await productcategory.create(req.body);
    console.log(response);
    res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'not created'
    });
});

// Lấy danh mục sản phẩm
const getproductcategory = asyncHandler(async (req, res) => {
    const response = await productcategory.find().select('title id');
    res.status(200).json({
        success: response ? true : false,
        getproductcategory: response ? response : 'not found product category'
    });
});

// Cập nhật danh mục sản phẩm
const updatedproductcategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await productcategory.findByIdAndUpdate(pcid, req.body, { new: true });
    res.status(200).json({
        success: response ? true : false,
        updatedproductcategory: response ? response : 'can not update product category'
    });
});

// Xóa danh mục sản phẩm
const deleteproductcategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await productcategory.findByIdAndDelete(pcid);
    res.status(200).json({
        success: response ? true : false,
        deleteproductcategory: response ? response : 'can not update product category'
    });
});

module.exports = {
    postproductcategory,
    getproductcategory,
    updatedproductcategory,
    deleteproductcategory
};