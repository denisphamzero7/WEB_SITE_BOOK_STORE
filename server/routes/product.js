const router = require('express').Router();
const controler = require('../controllers/productcontroller');
const uploader = require('../config/cloudinary.config');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/',[verifyAccessToken, isAdmin ],uploader.array('images',5),controler.createProduct);

router.get('/', controler.allProducts);
router.put('/ratings', verifyAccessToken, controler.ratings);
router.get('/:pid', controler.getAnProduct);

router.delete('/:pid', [verifyAccessToken,], controler.deleteAnProduct);
router.delete('/', [verifyAccessToken, isAdmin], controler.deleteAllProduct);
router.put('/:pid', [verifyAccessToken, isAdmin], uploader.array('images',5), controler.updateAnProduct);
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 10), controler.uploadImage);
module.exports = router



