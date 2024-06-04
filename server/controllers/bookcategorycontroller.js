const BookCategory = require("../models/bookcategory");
const asyncHandler = require("express-async-handler");

const createBookCategory = asyncHandler(async (req, res) => {
    
    const response = await BookCategory.create(req.body);
    res.status(200).json({
        success: response ? true : false,
        newbookcategory: response ? response : "not created",
    });
});
const updateBookCategory = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const response = await BookCategory.findByIdAndUpdate(bid, req.body, { new: true });
    res.status(200).json({
        success: response ? true : false,
        updateBookCategory: response ? response : "not updated category book ",
    });
});
const getBookCategory = asyncHandler(async (req, res) => {
    const response = await BookCategory.find();
    res.status(200).json({
        success: response ? true : false,
        BookCategory: response ? response : "not find",
    });
});

const deleteBookCategory = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const response = await BookCategory.findByIdAndDelete(bid);
    return res.status(200).json({
      status: response ? true : false,
      rs: response ? 'đã xoá thành công ' : "can not delete Material ",
    });
  });

module.exports = {
    createBookCategory,
    updateBookCategory,
    getBookCategory,
    deleteBookCategory,
};
