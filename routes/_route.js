const router =require('express').Router();
const _controller =require('../controllers/_controller')

router.get('/',_controller.something)

module.exports = router;