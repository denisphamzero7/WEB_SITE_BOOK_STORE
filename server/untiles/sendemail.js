const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");

const sendMail = asyncHandler(async({email, html}) =>{

  console.log('email',email);
  console.log('html',html);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
    
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"book store" <no-reply@bookstore.com>',// sender address
          to: email, // list of receivers
          subject: "Forgot password", // Subject line
          html: html, // html body
        });
      
       return info
});
module.exports = sendMail;