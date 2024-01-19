const router = require('express').Router();
const controller = require('../controllers/productcategory');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');


router.get('/',  controller.getproductcategory);
router.post('/', [verifyAccessToken], controller.postproductcategory);
router.put('/:pcid', [verifyAccessToken, isAdmin], controller.updatedproductcategory);
router.delete('/:pcid', [verifyAccessToken, isAdmin], controller.deleteproductcategory);

module.exports = router

