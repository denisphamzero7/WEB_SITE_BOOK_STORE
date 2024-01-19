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
router.post('/refreshtoken',controler.refreshAccessToken)
router.get('/forgotpassword/',controler.forgotPassword)
router.get('/',[verifyAccessToken,],controler.getUsers)

router.put('/resetpassword',controler.resetpassword)
router.delete('/',[verifyAccessToken, isAdmin], controler.deleteUser)
router.put('/current/:uid',[verifyAccessToken],controler.updateUser)
router.put('/cart/',[verifyAccessToken],controler.updatecart)
router.put('/address/:uid',[verifyAccessToken], controler.updateuserAddress)
router.put('/:uid',[verifyAccessToken, isAdmin], controler.updateUserByAdmin)

module.exports = router
// CRUD | Create - Read - Update - Delete |POST - GET - PUT - DELETE