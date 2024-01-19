const router = require('express').Router();
const controller = require('../controllers/publishercontroller');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/',  controller.getpublisher);
router.post('/', [verifyAccessToken], controller.createpublisher);

router.get('/:plid',  controller.getanpublisher);
router.put('/:plid', [verifyAccessToken, isAdmin], controller.updatedpublisher);
router.delete('/:plid', [verifyAccessToken, isAdmin], controller.deletepublisher);

module.exports = router
