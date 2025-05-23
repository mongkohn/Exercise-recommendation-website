const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// User CRUD
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/check', userController.checkDuplicateUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;