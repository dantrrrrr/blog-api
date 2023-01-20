const router = require('express').Router();
const User = require('../models/User');
const UserController =require('../controllers/UserController');


router.put('/:id',UserController.update)
router.delete('/:id',UserController.delete)
router.get('/:id',UserController.getUser)


module.exports = router;