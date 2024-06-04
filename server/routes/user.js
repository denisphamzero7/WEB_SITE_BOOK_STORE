const router = require('express').Router();
const controler = require('../controllers/usercontroller')
// const {verifyAccessToken} =require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config');
const {verifyAccessToken,isAdmin} = require('../middlewares/verifyToken')
router.post('/', controler.createuser)

router.post('/register',controler.register)
router.post('/login',controler.login)
router.get('/logout',verifyAccessToken,controler.logout)
router.get('/current',verifyAccessToken,controler.getaUser)
router.get('/statistical',[verifyAccessToken,isAdmin],controler.statistical)
router.post('/refreshtoken',controler.refreshAccessToken)
router.get('/forgotpassword/',controler.forgotPassword)
router.get('/',[verifyAccessToken,],controler.getUsers)
router.get('/:id',[verifyAccessToken,isAdmin],controler.getaUserById)
router.put('/resetpassword',controler.resetpassword)
router.delete('/:id',[verifyAccessToken, isAdmin], controler.deleteUser)
router.put('/current',[verifyAccessToken],uploader.single('avatar'),controler.updateUser)
router.put('/cart/',[verifyAccessToken],controler.updatecart)
router.put('/address',[verifyAccessToken], controler.updateuserAddress)
router.delete('/cart/:pid',[verifyAccessToken], controler.deleteProductFromCart)
router.put('/wishlist/:pid',verifyAccessToken,controler.updatewishlist)
router.delete('/wishlist/:pid',verifyAccessToken,controler.removeproductinwishlist)
router.put('/:id',[verifyAccessToken, isAdmin],uploader.single('avatar'),controler.updateUserByAdmin)


module.exports = router
// CRUD | Create - Read - Update - Delete |POST - GET - PUT - DELETE