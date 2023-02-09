const router = require('express').Router();
const User = require('../models/User');
const UserController =require('../controllers/UserController');
const {verifyUser} =require('../middlewares/verifyToken');

router.put('/:id',verifyUser,UserController.update)
router.delete('/:id',UserController.delete)
router.get('/:id',UserController.getUser)


module.exports = router;