const News = require("../models/news");
const asyncHandler = require("express-async-handler");

const createNewNews = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) throw new Error("missing inputs");
    const response = await News.create(req.body);
    res.status(200).json({
        success: response ? true : false,
        newNews: response ? response : "not created",
    });
});

const updateNews = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error("missing inputs");
    const response = await News.findByIdAndUpdate(bid, req.body, { new: true });
    res.status(200).json({
        success: response ? true : false,
        updatedNews: response ? response : "not updated",
    });
});

const getAllNews = asyncHandler(async (req, res) => {
    const response = await News.find();
    res.status(200).json({
        success: response ? true : false,
        news: response ? response : "not found",
    });
});

const likeNews = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { bid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bid)) {
        return res.status(400).json({ success: false, message: "Invalid bid" });
    }

    const news = await News.findById(bid);

    if (!news) {
        return res.status(404).json({ success: false, message: "News not found" });
    }

    const alreadyLikedIndex = news.likes.findIndex(el => el.toString() === id);

    if (alreadyLikedIndex !== -1) {
        news.likes.splice(alreadyLikedIndex, 1);
    } else {
        news.likes.push(id);
    }

    const response = await news.save();

    res.status(200).json({
        success: true,
        rs: response,
    });
});

const dislikeNews = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { bid } = req.params;

    if (!bid) {
        return res.status(400).json({ success: false, message: "Missing bid" });
    }

    const news = await News.findById(bid);

    if (!news) {
        return res.status(404).json({ success: false, message: "News not found" });
    }

    const alreadyLikedIndex = news.likes.findIndex(el => el.toString() === id);
    const alreadyDislikedIndex = news.dislikes.findIndex(el => el.toString() === id);

    if (alreadyLikedIndex !== -1) {
        news.likes.splice(alreadyLikedIndex, 1);
        news.dislikes.push(id);
    } else if (alreadyDislikedIndex !== -1) {
        news.dislikes.splice(alreadyDislikedIndex, 1);
    } else {
        news.dislikes.push(id);
    }

    const response = await news.save();

    res.status(200).json({
        success: true,
        rs: response,
    });
});

const getNews = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const news = await News.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
        .populate('likes', '-refreshToken -password -role -createdAt -updatedAt')
        .populate('dislikes', '-refreshToken -password -role -createdAt -updatedAt');

    res.status(200).json({
        success: news ? true : false,
        rs: news ? news : "not found",
    });
});

const deleteNews = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const news = await News.findByIdAndDelete(bid);
    res.status(200).json({
        success: news ? true : false,
        rs: news ? "delete news success" : "can not delete",
    });
});

const uploadImage= asyncHandler(async (req, res) => {
    console.log('hhh');
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    res.status(200).json({
        success: true,
        imageUrl: req.file.path, // Cloudinary's URL for the uploaded image
    });
   
});

module.exports = {
    createNewNews,
    updateNews,
    likeNews,
    dislikeNews,
    getNews,
    deleteNews,
    uploadImage,
    getAllNews
};
