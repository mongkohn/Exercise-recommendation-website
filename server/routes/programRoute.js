const express = require('express');
const router = express.Router();
const programController = require('../controller/programController');

// Basic CRUD routes
router.get('/', programController.getAllPrograms);
router.get('/:id', programController.getProgramById);
router.post('/', programController.createProgram);
router.put('/:id', programController.updateProgram);
router.delete('/:id', programController.deleteProgram);

// Comment routes
router.post('/:id/comments', programController.addComment);
router.delete('/:id/comments/:commentId', programController.deleteComment);

module.exports = router;
