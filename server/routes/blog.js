const router = require('express').Router();
const controller = require('../controllers/blogcontroller');
const uploader = require('../config/cloudinary.config');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');


router.get('/', controller.getBlogs)
router.post('/',[verifyAccessToken, isAdmin], controller.createNewBlog)
router.get('/one/:bid',controller.getBlog)
router.delete('/one/:bid',controller.deleteblog)
router.put('/like/:bid',[verifyAccessToken, isAdmin], controller.likeBlog)
router.put('/dislike/:bid',[verifyAccessToken, isAdmin], controller.dislikeBlog)
router.put('/uploadimageblog/:bid',[verifyAccessToken], uploader.single('image'),controller.uploadImageBlog);
router.put('/:bid',[verifyAccessToken, isAdmin], controller.updateBlog)
module.exports = router