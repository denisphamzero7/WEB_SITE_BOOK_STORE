const newscategory = require('../models/newscategory')
const asyncHandler = require('express-async-handler')


// Create a new news category

const createnewscategory = asyncHandler(async(req, res) => {
     const response = await newscategory.create(req.body)
     res.status(200).json({
        status: true?true:false,
        result: response?response: 'not created',
     })
})
// Lấy danh mục sản phẩm
const getnewscategory = asyncHandler(async (req, res) => {
    const response = await newscategory.find().populate('title');
    res.status(200).json({
        success: response.length >0 ? true : false,
        newscategory: response.length >0 ? response : 'not found news category'
    });
});

// Cập nhật danh mục sản phẩm
const updatednewscategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const response = await newscategory.findByIdAndUpdate(bcid, req.body, { new: true });
    res.status(200).json({
        success: response ? true : false,
        updatednewscategory: response ? response : 'can not update news category'
    });
});

// Xóa danh mục sản phẩm
const deletenewscategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    if(!bcid) return new Error('Invalid');
    const response = await newscategory.findByIdAndDelete(bcid);
    res.status(200).json({
        success: response ? true : false,
        deletenewscategory: response ? 'delete success' : 'can not update news category'
    });
});

module.exports = {
    createnewscategory,
    getnewscategory,
    updatednewscategory,
    deletenewscategory
};