const router = require('express').Router();
const controller = require('../controllers/bookcategorycontroller');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');


router.post('/',[verifyAccessToken, isAdmin], controller.createBookCategory)
router.get('/', controller.getBookCategory)
router.put('/:bid',[verifyAccessToken, isAdmin], controller.updateBookCategory)
router.delete('/:bid',[verifyAccessToken, isAdmin], controller.deleteBookCategory)
module.exports = router