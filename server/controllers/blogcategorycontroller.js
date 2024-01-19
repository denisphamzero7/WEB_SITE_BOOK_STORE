const blogcategory = require('../models/blogcategory')
const asyncHandler = require('express-async-handler')


// Create a new blog category

const createblogcategory = asyncHandler(async(req, res) => {
     const response = await blogcategory.create(req.body)
     res.status(200).json({
        status: true?true:false,
        result: response?response: 'not created',
     })
})
// Lấy danh mục sản phẩm
const getblogcategory = asyncHandler(async (req, res) => {
    const response = await blogcategory.find().populate('title');
    res.status(200).json({
        success: response.length >0 ? true : false,
        blogcategory: response.length >0 ? response : 'not found blog category'
    });
});

// Cập nhật danh mục sản phẩm
const updatedblogcategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const response = await blogcategory.findByIdAndUpdate(bcid, req.body, { new: true });
    res.status(200).json({
        success: response ? true : false,
        updatedblogcategory: response ? response : 'can not update blog category'
    });
});

// Xóa danh mục sản phẩm
const deleteblogcategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    if(!bcid) return new Error('Invalid');
    const response = await blogcategory.findByIdAndDelete(bcid);
    res.status(200).json({
        success: response ? true : false,
        deleteblogcategory: response ? 'delete success' : 'can not update blog category'
    });
});

module.exports = {
    createblogcategory,
    getblogcategory,
    updatedblogcategory,
    deleteblogcategory
};