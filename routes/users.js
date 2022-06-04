var express = require('express');
const userController = require('../controllers/user.controller');
var router = express.Router();

/**
 * @Path /users
*/


router.get('/', userController.getAllUsers )
router.post('/', userController.createUser )
router.get('/findUser', userController.getUserByName )
router.get('/:_id', userController.getUserById )
router.delete('/:_id', userController.deleteUserById )



module.exports = router;
