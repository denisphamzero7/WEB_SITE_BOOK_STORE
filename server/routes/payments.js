const router = require('express').Router();
const controller = require('../controllers/paymentcontroller');

const { verifyAccessToken } = require('../middlewares/verifyToken');
router.get('/config',verifyAccessToken, controller.configpaypal)


module.exports = router
