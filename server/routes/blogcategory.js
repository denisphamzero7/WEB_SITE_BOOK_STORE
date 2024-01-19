const router = require('express').Router();
const controller = require('../controllers/blogcategorycontroller');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], controller.createblogcategory);
router.get('/',  controller.getblogcategory);
router.put('/:bcid', [verifyAccessToken, isAdmin], controller.updatedblogcategory);
router.delete('/:bcid', [verifyAccessToken, isAdmin], controller.deleteblogcategory);

module.exports = router
