const router = require('express').Router();
const controller = require('../controllers/ordercontroller');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
router.get('/', [verifyAccessToken,], controller.getUserOrder)
router.get('/admin', [verifyAccessToken,isAdmin ], controller.getOrders)
router.post('/', [verifyAccessToken,], controller.createOrder);
router.put('/status/:oid', [verifyAccessToken,], controller.updateStatus)

module.exports = router
