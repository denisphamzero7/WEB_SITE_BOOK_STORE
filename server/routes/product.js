const router = require('express').Router();
const controller = require('../controllers/productcontroller');
const uploader = require('../config/cloudinary.config');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/',[verifyAccessToken, isAdmin ],uploader.array('images',5),controller.createProduct);

router.get('/', controller.allProducts);
router.put('/ratings', verifyAccessToken, controller.ratings);
router.get('/:pid', controller.getAnProduct);

router.delete('/:pid', [verifyAccessToken,], controller.deleteAnProduct);
router.delete('/', [verifyAccessToken, isAdmin], controller.deleteAllProduct);
router.put('/:pid', [verifyAccessToken, isAdmin], uploader.array('images',5), controller.updateAnProduct);
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 5), controller.uploadImage);

router.post('/recommend/:q', [verifyAccessToken], controller.recommendProduct)
module.exports = router



