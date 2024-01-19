const router = require('express').Router();
const controler = require('../controllers/bannercontroler');
const uploader = require('../config/cloudinary.config');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
router.put('/',[verifyAccessToken],uploader.array('images',8),controler.createBanner);
router.get('/',controler. getBanner);
router.post('/',  uploader.array('images',10),controler.testapi)
router.delete('/:id',verifyAccessToken,controler.deleteBanner);

module.exports = router