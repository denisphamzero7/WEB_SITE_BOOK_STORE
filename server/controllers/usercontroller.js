const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const asynhandle = require("express-async-handler");
const {
  generateAcessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const { verify } = require("jsonwebtoken");
const sendMail = require("../untiles/sendemail");
const crypto = require("crypto");
const order = require("../models/order");

//register
const register = asynhandle(async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  if (!email || !password || !firstname || !lastname || !mobile)
    return res.status(400).json({
      success: false,
      message: "Đầu vào thiếu",
    });
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("Email đã tồn tại");
  } else {
    const newUser = await User.create(req.body);
    return res.json({
      success: newUser ? true : false,
      newUser,
      message: newUser
        ? "Đăng kí thành công. Làm ơn đi tới đăng nhập"
        : "Có lẽ bị lỗi",
    });
  }
});
//login
// refresh token => cấp mới access token
// Access token => xát thực ngươi dùng , phân quyền người dùng
const login = asynhandle(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      sucess: false,
      message: "Missing inputs",
    });
  //plain object
  const response = await User.findOne({ email });
  if (response && (await response.isCorectPassword(password))) {
    // tách password và role khỏi database
    const { password, refreshToken, role, ...userData } = response.toObject();
    //tạo access token
    const accessToken = generateAcessToken(response._id, role);
    //tạo refresh token
    const newrefreshToken = generateRefreshToken(response._id);
    //lưu refresh token vào database
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newrefreshToken },
      { new: true }
    );
    //lưu refresh token vào cookie
    res.cookie("refreshToken", newrefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send({
      status: 200,
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("dăng nhập thất bại");
  }
});

// get current user
const getaUser = asynhandle(async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id)
    .select("-refreshToken -password")
    .populate({
      path: "cart",
      populate: {
        path: "product",
        select: "name images price quantity",
      },
    })
    .populate("wishlist", "name images price role");
  return res.json({
    success: user ? true : false,
    result: user ? user : "khong tim thay user",
  });
});
const getaUserById = asynhandle(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id)
    .select("-refreshToken -password")
    .populate({
      path: "cart",
      populate: {
        path: "product",
        select: "name images price quantity",
      },
    })
    .populate("wishlist", "name images price role");
  return res.json({
    success: user ? true : false,
    user: user ? user : "khong tim thay user",
  });
});
const refreshAccessToken = asynhandle(async (req, res) => {
  // lấy token từ cookie
  const cookie = req.cookies;
  // kiểm tra có token hay ko
  if (!cookie && !cookie.refreshToken) throw new Error("no refresh token");
  // kiểm tra token có hợp lệ hay không

  const result = await verify(cookie.refreshToken, process.env.JWT_SECRET);
  console.log(result);
  const response = await User.findOne({
    _id: result.id,
    refreshToken: cookie.refreshToken,
  });
  return res.json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAcessToken(response.id, response.role)
      : "refresh token not matched",
  });
});
//log out the user
const logout = asynhandle(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken) throw new Error("no refresh token");
  //xoá refresh token ở db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: " Đã xoá " },
    { new: true }
  );
  //xoá refresh token ở cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  // Xóa user data từ localStorage
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");

  return res.json({
    success: true,
    mess: "Logout successfully",
  });
});
//quên mật khẩu
const forgotPassword = asynhandle(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found");
  const resetToken = user.getResetPasswordToken();
  await user.save();
  const html = `xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.link này hết hạn sau 15p kể từ bây giờ, <a href= ${process.env.URL_SERVER}/api/user/resetpassword/${resetToken}> click here<a>`;
  const data = {
    email,
    html,
  };
  const rs = await sendMail(data);
  return res.json({
    success: true,
    message: rs,
  });
});
// Client gửi email
// Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
// Client check mail => click link
// Client gửi api kèm token
// Check token có giống với token mà server gửi mail hay không
// Change password
//reset password
const resetpassword = asynhandle(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("missing input");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("invalid reset token");
  user.password = password;
  user.passwordChangeAt = Date.now();
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  return res.json({
    success: user ? true : false,
    mes: user ? "update password" : "something went wrong",
  });
});
//post user
const createuser = asynhandle(async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const response = await User.create(req.body);
  return res.json({
    status: response ? true : false,
    response,
  });
});
//get all users

// const getallusers = asynhandle(async (req, res) => {
//     const response = await User.find();
//     console.log(response);
//     return res.json({
//         status: response ? true : false,
//         response,
//     });
// });
const getUsers = asynhandle(async (req, res) => {
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
  let queryCommand = User.find(formatedqueries);
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
  queryCommand.skip(skip).limit(limit);

  // execute query
  try {
    const response = await queryCommand.exec();
    const counts = await User.find(formatedqueries).countDocuments();

    return res.status(200).json({
      success: response.length > 0,
      users: response || "can not get products",
      counts,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
// delete a  user
const deleteUser = asynhandle(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("missing input");
  const response = await User.findByIdAndDelete(_id);
  return res.json({
    status: response ? true : false,
    deleteUser: response
      ? `User with email ${response.email} delete`
      : "no user delete",
  });
});
const updateUser = asynhandle(async (req, res) => {
  const { id } = req.user;
  if (!id || Object.keys(req.body).length === 0)
    throw new Error("missing input");
  let data = { ...req.body };
  if (req.file) {
    data.avatar = req.file.path;
  }
  const response = await User.findByIdAndUpdate(id, data, {
    new: true,
  }).select("-password -role");
  return res.json({
    status: response ? true : false,
    updateUser: response ? response : "something wrong !!!",
  });
});
const updateUserByAdmin = asynhandle(async (req, res) => {
  const { id } = req.params;
  if (!id || Object.keys(req.body).length === 0)
    throw new Error("missing input");
  let data = { ...req.body };
  if (req.file) {
    data.avatar = req.file.path;
  }
  const response = await User.findByIdAndUpdate(id, data, {
    new: true,
  }).select("-password -role");
  console.log(response, "alo");
  return res.json({
    status: response ? true : false,
    updateUserByAdmin: response ? response : "something wrong !!!",
  });
});
const updatecart = async (req, res) => {
  try {
    const { id } = req.user;
    const { pid, quantity = 1 } = req.body;

    if (!pid) throw new Error("missing input");

    const user = await User.findById(id).select("cart");
    const existingProductIndex = user?.cart.findIndex(
      (el) => el.product.toString() === pid
    );

    if (existingProductIndex !== -1) {
      // Update the existing product or do nothing if already exists
      user.cart[existingProductIndex] = { product: pid, quantity };
    } else {
      // Add a new product to the cart
      user.cart.push({ product: pid, quantity });
    }

    const response = await User.findByIdAndUpdate(
      id,
      { cart: user.cart },
      { new: true }
    );

    return res.json({
      success: !!response,
      updatedUser: response || "Something went wrong",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
const deleteProductFromCart = asynhandle(async (req, res) => {
  try {
    const { id } = req.user;
    const { pid } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          cart: {
            product: pid,
          },
        },
      },
      { new: true }
    );

    res.json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});
const updateuserAddress = asynhandle(async (req, res) => {
  const { id } = req.user;
  if (!req.body.address) throw new Error("missing address");
  const { address } = req.body; // Extract the address string from the object
  const response = await User.findByIdAndUpdate(
    id,
    { $set: { address: address } }, // Use the extracted address string and $set to update the field
    { new: true }
  ).select("-password -role -refreshToken");
  return res.json({
    success: response ? true : false,
    updateuser: response ? response : "something wrong",
  });
});
const updatewishlist = asynhandle(async (req, res) => {
  const { id } = req.user;
  const { pid } = req.params;
  const user = await User.findById(id);
  const existwishlist = user.wishlist?.findIndex((el) => el.toString() === pid);

  if (existwishlist !== -1) {
    // Nếu sản phẩm đã tồn tại trong wishlist, loại bỏ nó
    const response = await User.findByIdAndUpdate(
      id,
      { $pull: { wishlist: pid } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      mess: response
        ? "Removed from your wishlist"
        : "Failed to remove from your wishlist",
    });
  } else {
    // Nếu sản phẩm không tồn tại trong wishlist, thêm nó vào
    const response = await User.findByIdAndUpdate(
      id,
      { $push: { wishlist: pid } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      mess: response
        ? "Added to your wishlist"
        : "Failed to add to your wishlist",
    });
  }
});
const removeproductinwishlist = asynhandle(async (req, res) => {
  const { id } = req.user;
  const { pid } = req.params;
  const response = await User.findByIdAndUpdate(
    id,
    { $pull: { wishlist: pid } },
    { new: true }
  );
  return res.json({
    success: response ? true : false,
    mess: response
      ? "Removed from your wishlist"
      : "Failed to remove from your wishlist",
  });
});

// thống kê
const statistical = asynhandle(async (req, res) => {
  try {
    const { id } = req.user;

    const orders = await Order.find();
    const successfulOrders = orders.filter(order => order.status === 'success');
    const totalPayment = successfulOrders.reduce((acc, order) => acc + order.total, 0);
    const users = await User.find({ _id: { $ne: id } });
    const totalUser = users.length;
    const products = await Product.find();
    const totalProduct = products.length;

    return res.json({
      success: true,
      totalOrder: orders.length,
      totalPayment,
      totalUser,
      totalProduct,
    });
  } catch (error) {
    console.log(error);
  }
});


module.exports = {
  updatewishlist,
  removeproductinwishlist,
  createuser,
  deleteUser,
  register,
  login,
  getaUser,
  getaUserById,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetpassword,
  getUsers,
  updateUser,
  updateUserByAdmin,
  updatecart,
  updateuserAddress,
  deleteProductFromCart,
  statistical,
};
