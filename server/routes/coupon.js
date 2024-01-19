const router = require('express').Router();
const controller = require('../controllers/couponcontroller');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], controller.createcoupon);
router.get('/',  controller.getcoupons);
router.get('/:cpid',  controller.getcoupon);
router.put('/:cpid', [verifyAccessToken, isAdmin], controller.updatedcoupon);
router.delete('/:cpid', [verifyAccessToken, isAdmin], controller.deletecoupon);

module.exports = router
