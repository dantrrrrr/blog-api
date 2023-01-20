const router = require('express').Router();
const PostController =require('../controllers/PostController');


router.get('/:slug',PostController.getPost)
router.put('/:id',PostController.update)
router.delete('/:id',PostController.delete)

router.post('/',PostController.create)
router.get('/',PostController.getAllPosts)

module.exports = router;