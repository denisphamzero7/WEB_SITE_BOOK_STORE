const router = require('express').Router();
const controler = require('../controllers/authorcontroller')
const uploader = require('../config/cloudinary.config');
//const {verifyAccessToken} =require('../middlewares/verifyToken')
const {verifyAccessToken,isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken,isAdmin],controler.createAuthor)
router.get('/',controler.getAllAuthors)
router.get('/:id',[verifyAccessToken,isAdmin],controler.getAnAuthor)
router.put('/:id',[verifyAccessToken,isAdmin],controler.updateAnAuthor)
router.delete('/:id',[verifyAccessToken,isAdmin],controler.deleteAnAuthor)
router.put('/uploadimage/:id',[verifyAccessToken, isAdmin],uploader.single('image'), controler.uploadImage);
module.exports = router
// CRUD | Create - Read - Update - Delete |POST - GET - PUT - DELETE