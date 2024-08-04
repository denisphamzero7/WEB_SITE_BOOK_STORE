const asyncHandler = require('express-async-handler')

const configpaypal = asyncHandler((req, res) => {
    console.log('ok');
   return res.status(200).json({
    status: 'ok',
     data:process.env.PAYPAL_CUSTOMER_ID
   })
})

module.exports={
    configpaypal
}