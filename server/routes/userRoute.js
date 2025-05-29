const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Debug middleware to log all requests
router.use((req, res, next) => {
  console.log(`User Route: ${req.method} ${req.path}`);
  next();
});

// Auth routes (must be before any :id routes)
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.post('/check', userController.checkDuplicateUser);
router.get('/auth/status', userController.checkAuthStatus);

// Specific named routes (before :id routes)
router.get('/status/:status', userController.getUsersByStatus);

// General user routes
router.get('/', userController.getAllUsers);

// User CRUD with ID parameters (these should be last)
router.get('/:id', (req, res, next) => {
  console.log('Getting user by ID:', req.params.id);
  next();
}, userController.getUserById);

router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.delete('/:id/permanent', userController.permanentDeleteUser);
router.patch('/:id/activate', userController.activateUser);

module.exports = router;