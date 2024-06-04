const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Product = require("../models/product");
const Author = require("../models/author");
const Order = require("../models/order")
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const User  = require("../models/user")
const author = require("../models/author");
const axios = require("axios");

// const upload = require('../middlewares/upload');
// create a new product
const createProduct = asyncHandler(async (req, res) => {

     if (Object.keys(req.body).length === 0) throw new Error("Missing input");
      if (req.body && req.body.name) req.body.slug = slugify(req.body.name);
      // Check if the slug already exists
      const existingProduct = await Product.findOne({ slug: req.body.slug });
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          error: "Product with the same slug already exists",
        });
      }
      const imagePaths = req.files ? req.files.filter(i => i.path).map(i => i.path) : [];
      
      const newProduct = await Product.create({...req.body, images: imagePaths});

  if (req.body.author) {
    const author = await Author.findByIdAndUpdate(
      req.body.author,
      { $push: { listProduct: newProduct._id } },
      { new: true }
    ).select("name");
    if (!author) {
      return res.status(400).json({
        success: false,
        error: "Author not found",
      });
    }
  }
  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : "cannot create new product",
  });
});


//get all products
// filtering, sorting & pagination
const allProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
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
  // filter
  if (queries?.name)
    formatedqueries.name = { $regex: queries.name, $options: "i" };
  let queryCommand = Product.find(formatedqueries);
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
    .populate("author publisher category", "name title")
    .populate({
      path:'bookcategory',
      select:'title',
     })

  // execute query
  try {
    const response = await queryCommand.exec();
    const counts = await Product.find(formatedqueries).countDocuments();

    return res.status(200).json({
      success: response.length > 0,
      products: response || "can not get products",
      counts,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
// get an product
const getAnProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  if (req.files && req.files.length > 0) {
    // Update the path of the image
    product.images = req.files[0].path;
    await product.save();
  }
  const product = await Product.findById(pid)
  .populate(
    "author publisher",
    "name title"
  ).populate({
    path:'rating',
    populate:{
     path:'postedBy',
     select:'firstname lastname avatar',
    }
   })
   .populate("bookcategory")
  return res.status(200).json({
    success: true ? true : false,
    mess: product ? product : "no product found",
  });
});
// update An Product
const updateAnProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    .populate("author", " name")
    .select("-listProduct");
  return res.status(200).json({
    success: true,
    product,
    mess: product ? "success" : "failure",
  });
});

// delete an product
const deleteAnProduct = asyncHandler(async (req, res) => {
  const {pid}= req.params;
  const product = await Product.findByIdAndDelete(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: true,
    mess: product ? "delete an product success" : "failure",
  });
});
// delete all products

const deleteAllProduct = asyncHandler(async (req, res) => {
  const product = await Product.deleteMany({});
  res.status(200).json({
    success: true,
    mess: product ? "delete all product success" : "failure",
  });
});
// upload image

const uploadImage = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) throw new Error("Missing product ID");
  if (!req.files) throw new Error("missing inputs");
  const existingProduct = await Product.findById(pid);
  if (!existingProduct) {
    return res.status(404).json({
      success: false,
      mess: "Không tìm thấy sản phẩm",
    });
  }
  const imagePaths = req.files.map((el) => el.path);
  const response = await Product.findByIdAndUpdate(
    pid,
    { $push: { images: { $each: imagePaths } } },
    { new: true }
  );
  if (!response) throw new Error("updateProduct failed");
  return res.status(200).json({
    status: true,
    updateProduct: response,
    message: "Product updated successfully",
  });
});
//put rating
const ratings = asyncHandler(async (req, res) => {
  // Lấy id từ đối tượng req.user và start, comments, pid từ req.body
  const { id } = req.user;
  const { start, comments, pid } = req.body;

  if (!start || !id) {
    throw new Error("Missing input");
  }

  try {
    // Tìm sản phẩm dựa trên pid
    const ratingproduct = await Product.findById(pid);

    // Tìm xem người dùng đã đánh giá sản phẩm trước đó chưa
    const targetProduct = ratingproduct?.rating.find(
      (rating) => rating.postedBy == id
    );

    // Nếu đã đánh giá, cập nhật đánh giá
    if (targetProduct) {
      targetProduct.start = start;
      targetProduct.comments = comments;
    } else {
      // Nếu chưa đánh giá, thêm một đánh giá mới
      ratingproduct.rating.push({
        start,
        comments,
        postedBy: { _id: new ObjectId(id) },
      });
    }

    // Lưu sản phẩm sau khi cập nhật đánh giá
    await ratingproduct.save();
    // update rating product
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.rating.length;
    const sumrating = updatedProduct.rating.reduce(
      (sum, el) => sum + +el.start,
      0
    );
    updatedProduct.totalRating =
      Math.round((sumrating * 10) / ratingCount) / 10;
    await updatedProduct.save();
    // Trả về phản hồi thành công
    return res.status(200).json({
      status: true,
      updatedProduct,
    });
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình xử lý
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});

// @desc Recommend products
// @route GET /api/products/recommend/:q
// @access Private
const recommendProduct = asyncHandler(async (req, res) => {
  const productId = req.params.q;
  let response = [];
  try {
    const productRating = await Product.find({
      rating: {
        $elemMatch: { postedBy: req.user._id }
      }
    
    })
    console.log(productRating);

    if (
      productRating == null ||
      productRating == undefined ||
      productRating.length == 0
    ) {
      const recommend = await axios.get(
        `http://127.0.0.1:5500/nonrating?q=${productId}`
      );

      response = await Product.find({
        _id: { $in: recommend?.data?.response },
      }).populate('category');

    } else {
      const recommend = await axios.get(`http://127.0.0.1:5500/?q=${req.user._id}`);


      response = await Product.find({
        _id: { $in: recommend?.data?.response },
      }).populate({ path: 'category', populate: { path: 'branch', model: 'Brand' } })

      console.log(response)
    }

    if (response.length !== 0) {
      res.json({ success: true, products: response });
    } else {
      res.status(500).json({ success: false, Products: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
})



module.exports = {
  createProduct,
  allProducts,
  getAnProduct,
  updateAnProduct,
  deleteAnProduct,
  deleteAllProduct,
  uploadImage,
  ratings,
  recommendProduct
};
