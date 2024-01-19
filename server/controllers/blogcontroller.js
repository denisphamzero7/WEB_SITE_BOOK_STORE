const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

// Tạo blog
const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) throw new Error("missing inputs");
    const response = await Blog.create(req.body);
    res.status(200).json({
        success: response ? true : false,
        newblog: response ? response : "not created",
    });
});
const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error("missing inputs");
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
    res.status(200).json({
        success: response ? true : false,
        updateblog: response ? response : "not updated blog ",
    });
});
const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find();
    res.status(200).json({
        success: response ? true : false,
        blog: response ? response : "not created",
    });
});

// LIKE
// DISLIKE
/*
khi người dùng like 1 bài blog thì :
1.check xem người đó có dislike hay ko => bỏ dislike
2.check xem người đó có like hay ko => thêm like
*/

const mongoose = require('mongoose');

const likeBlog = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { bid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bid)) {
        return res.status(400).json({ success: false, message: "Giá trị bid không hợp lệ" });
    }

    const blog = await Blog.findById(bid);

    if (!blog) {
        return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
    }

    const alreadyLikedIndex = blog.likes.findIndex(el => el.toString() === id);

    if (alreadyLikedIndex !== -1) {
        // Người dùng đã "like" bài viết, loại bỏ "like"
        blog.likes.splice(alreadyLikedIndex, 1);
    } else {
        // Người dùng chưa "like" bài viết, thêm "like"
        blog.likes.push(id);
    }

    const response = await blog.save(); // Lưu lại thông tin bài viết đã được cập nhật

    res.status(200).json({
        success: true,
        rs: response,
    });
});

const dislikeBlog = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { bid } = req.params;

    if (!bid) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin bài viết" });
    }

    const blog = await Blog.findById(bid);

    if (!blog) {
        return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
    }

    const alreadyLikedIndex = blog.likes.findIndex(el => el.toString() === id);
    const alreadyDislikedIndex = blog.dislikes.findIndex(el => el.toString() === id);

    if (alreadyLikedIndex !== -1) {
        // Người dùng đã "like" bài viết, loại bỏ "like" và thêm "dislike"
        blog.likes.splice(alreadyLikedIndex, 1);
        blog.dislikes.push(id);
    } else if (alreadyDislikedIndex !== -1) {
        // Người dùng đã "dislike" bài viết, loại bỏ "dislike"
        blog.dislikes.splice(alreadyDislikedIndex, 1);
    } else {
        // Người dùng chưa "like" hoặc "dislike" bài viết, thêm "dislike"
        blog.dislikes.push(id);
    }

    const response = await blog.save(); // Lưu lại thông tin bài viết đã được cập nhật

    res.status(200).json({
        success: true,
        rs: response,
    });
});
const excluded = '-refreshToken -password -role -createdAt -updatedAt'
const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndUpdate(bid,{$inc: {numberViews :1}},{new:true})
    .populate('likes',excluded).populate('dislikes',excluded);
     console.log(blog);
    res.status(200).json({
        success: true?true:false,
        rs: blog?blog:"not found",
    })
});
const  deleteblog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndDelete(bid)
    res.status(200).json({
        success: true?true:false,
        rs: blog?"delete blog success":"can not delete",
    })
   
});
const uploadImageBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
 
   
    if (!req.file) throw new Error("missing inputs");
    const response = await Blog.findByIdAndUpdate(
      bid,
      { image: req.file.path},
      { new: true }
    );
    if (!response) throw new Error("updateProduct failed");
    return res.status(200).json({
      status: true,
      updateBlog: response,
      message: "Product updated successfully",
    });
  });

module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteblog,
    uploadImageBlog
};
