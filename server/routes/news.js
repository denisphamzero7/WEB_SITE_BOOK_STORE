const router = require('express').Router();
const controller = require('../controllers/newscontroller');
const uploader = require('../config/cloudinary.config');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/', controller.getAllNews);
router.post('/', [verifyAccessToken, isAdmin], controller.createNewNews);
router.get('/one/:bid', controller.getNews);
router.delete('/one/:bid', controller.deleteNews);
router.put('/like/:bid', [verifyAccessToken, isAdmin], controller.likeNews);
router.put('/dislike/:bid', [verifyAccessToken, isAdmin], controller.dislikeNews);
router.put('/uploadImage', [verifyAccessToken], uploader.single('image'), controller.uploadImage);
router.put('/:bid', [verifyAccessToken, isAdmin], controller.updateNews);

module.exports = router;
