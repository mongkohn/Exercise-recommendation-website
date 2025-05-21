const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

// POST a new comment
// Path: /api/comments/
router.post('/', commentController.createComment);

// GET all comments for a specific article
// Path: /api/comments/:articleId
router.get('/:articleId', commentController.getCommentsByArticleId);

module.exports = router;
