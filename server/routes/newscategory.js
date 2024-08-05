const router = require('express').Router();
const controller = require('../controllers/newscategorycontroller');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], controller.createnewscategory);
router.get('/',  controller.getnewscategory);
router.put('/:bcid', [verifyAccessToken, isAdmin], controller.updatednewscategory);
router.delete('/:bcid', [verifyAccessToken, isAdmin], controller.deletenewscategory);

module.exports = router
