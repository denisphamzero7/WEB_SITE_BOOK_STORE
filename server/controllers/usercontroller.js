const User = require("../models/user");
const Product = require("../models/product");
const asynhandle = require("express-async-handler");
const { generateAcessToken, generateRefreshToken } = require("../middlewares/jwt");
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
        return res.status(200).json({
            success: newUser ? true : false,
            newUser,
            message: newUser
                ? "Đăng kí thành công. Làm ơn đi tới đăng nhập"
                : "Có lẽ bị lỗi"
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
        return res.status(200).json({
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
    console.log(id,'hsbhb');
    const user = await User.findById(id).select("-refreshToken -password -role");
    return res.status(200).json({
        success: user ? true : false,
        result: user ? user : "khong tim thay user",
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
    return res.status(200).json({
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
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');

    return res.status(200).json({
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
        html
    }
    const rs = await sendMail(data);
    return res.status(200).json({
        success: true,
        message: rs,
    })
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
    if (!password || !token) throw new Error("missing input")
    const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) throw new Error('invalid reset token')
    user.password = password;
    user.passwordChangeAt = Date.now();
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'update password' : 'something went wrong'
    })
})
//post user
const createuser = asynhandle(async (req, res) => {
    const { name, email, mobile, password } = req.body;
    const response = await User.create(req.body);
    return res.status(200).json({
        status: response ? true : false,
        response,
    });
});
//get all users

// const getallusers = asynhandle(async (req, res) => {
//     const response = await User.find();
//     console.log(response);
//     return res.status(200).json({
//         status: response ? true : false,
//         response,
//     });
// });
const getUsers = asynhandle(async (req, res) => {
    const response = await User.find().select('-refreshToken -password -role');
    return res.status(200).json({
        status: response ? true : false,
        users: response,
    });
})
// delete a  user
const deleteUser = asynhandle(async (req, res) => {
    const { _id } = req.query
    if (!_id) throw new Error('missing input')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        status: response ? true : false,
        deleteUser: response ? `User with email ${response.email} delete` : 'no user delete'
    })
});
const updateUser = asynhandle(async (req, res) => {
    const { _id } = req.user
    console.log(req.user)
    if (!_id || Object.keys(req.body).length === 0) throw new Error('missing input')
    
    const response = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password -role')
    return res.status(200).json({
        status: response ? true : false,
        updateUser: response ? response : 'something wrong !!!'
    })
});
const updateUserByAdmin = asynhandle(async (req, res) => {
    const { _id } = req.params
    console.log(req.user)
    if (!uid || Object.keys(req.body).length === 0) throw new Error('missing input')
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role')
    console.log(response, 'alo')
    return res.status(200).json({
        status: response ? true : false,
        updateUserByAdmin: response ? response : 'something wrong !!!'
    })
});
const updatecart = asynhandle(async (req, res) => {
    const { user } = req;
    const { pid, color, quantity } = req.body;

    if (!pid || !color || !quantity) {
        throw new Error('Missing input: pid, color, and quantity are required.');
    }

    try {
        const product = await Product.findById(pid);

        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        const existingCartItemIndex = user.cart.findIndex(
            (item) => item.product.toString() === pid && item.color === color
        );

        if (existingCartItemIndex !== -1) {
            user.cart[existingCartItemIndex].quantity = quantity;
        } else {
            user.cart.push({ product: pid, quantity, color });
        }

        const response = await user.save();

        res.status(200).json({ success: true, updateuser: response });
    } catch (error) {
        console.error('Error updating cart:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});


const updateuserAddress = asynhandle(async (req, res) => {
    const { id } = req.user;
    console.log(req.user,'alll');
    if (!req.body.address) throw new Error("missing address");
    const response = await User.findByIdAndUpdate(id,{$push: { address: req.body.address}},{new:true})
    res.status(200).json({
        success: response?true:false,
        updateuser:response?response:'some thing wrong'
    })
});


 module.exports = {
    createuser,
    deleteUser,
    register,
    login,
    getaUser,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetpassword,
    getUsers,
    updateUser,
    updateUserByAdmin,
    updatecart,
    updateuserAddress,
  
};
