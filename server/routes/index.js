const  useRouter  = require("./user")
const productRouter = require("./product")
const authorsRouter = require("./author")
const BannerRouter = require("./banner")
const ProductCategoryRouter = require("./productcategory")
const BlogCategoryRouter = require("./blogcategory")
const BlogRouter = require("./blog")
const PublisherRouter = require("./publisher")
const CouponRouter = require("./coupon")
const OrderRouter = require("./order")

const {notFound ,errHandler}= require("../middlewares/errorhandler")
const initrouter = (app) => {
    app.use('/api/user',useRouter)
    app.use('/api/product',productRouter)
    app.use('/api/author',authorsRouter)
    app.use('/api/banner',BannerRouter)
    app.use('/api/productcategory',ProductCategoryRouter)
    app.use('/api/blogcategory',BlogCategoryRouter)
    app.use('/api/blog',BlogRouter)
    app.use('/api/publisher',PublisherRouter)
    app.use('/api/coupon', CouponRouter)
    app.use('/api/order', OrderRouter )
    app.use(notFound)
    app.use(errHandler)
}

module.exports = initrouter;