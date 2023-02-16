const router = require('express').Router();
const PostController =require('../controllers/PostController');
const { verifyUser, verifyAdmin } = require('../middlewares/verifyToken');


router.get('/random',PostController.getRandom)
router.get('/:slug',PostController.getPost)
router.put('/:id',verifyUser,PostController.update)
router.delete('/:id',verifyAdmin,PostController.delete)

router.post('/',verifyUser,PostController.create)
router.get('/',PostController.getAllPosts)

module.exports = router;