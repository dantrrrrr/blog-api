const router = require('express').Router();
const User = require('../models/User');
const UserController =require('../controllers/UserController');
const {verifyUser, verifyAdmin} =require('../middlewares/verifyToken');

router.put('/:id',verifyUser,UserController.update)
router.delete('/:id',verifyAdmin,UserController.delete)
router.get('/:id',verifyUser,UserController.getUser)


module.exports = router;