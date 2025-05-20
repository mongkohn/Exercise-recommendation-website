const express = require('express');
const router = express.Router();
const videoController = require('../controller/videoController');

router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.post('/', videoController.createVideo);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

router.post('/:id/comments', videoController.addComment);
router.delete('/:id/comments/:commentId', videoController.deleteComment);

module.exports = router;