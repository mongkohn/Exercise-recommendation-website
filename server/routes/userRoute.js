const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// User routes
router.use('/', userController);

module.exports = router;