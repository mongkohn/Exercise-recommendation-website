const Video = require("../models/videoSchema");

// Helper to format video object
const formatVideo = (v) => ({
    _id: v._id,
    title: v.title,
    description: v.description,
    url: v.url,
    equipment: v.equipment,
    muscles: v.muscles,
    comments: v.comments
});

// Get all videos
const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.json(videos.map(formatVideo));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single video by ID
const getVideoById = async (req, res) => {
    try {
        const v = await Video.findById(req.params.id);
        if (!v) return res.status(404).json({ error: "Video not found" });
        res.json(formatVideo(v));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new video
const createVideo = async (req, res) => {
    try {
        const { title, description, url, equipment, muscles } = req.body;
        const video = new Video({ title, description, url, equipment, muscles });
        await video.save();
        res.status(201).json(formatVideo(video));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update video
const updateVideo = async (req, res) => {
    try {
        const { title, description, url, equipment, muscles } = req.body;
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            { title, description, url, equipment, muscles },
            { new: true }
        );
        if (!video) return res.status(404).json({ error: "Video not found" });
        res.json(formatVideo(video));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete video
const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) return res.status(404).json({ error: "Video not found" });
        res.json({ message: "Video deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a comment to a video
const addComment = async (req, res) => {
    try {
        const { username, text } = req.body;
        if (!username || !text) {
            return res.status(400).json({ error: "username and text are required" });
        }
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ error: "Video not found" });

        video.comments.push({
            username,
            text,
            createdAt: new Date()
        });
        await video.save();
        res.status(201).json({ message: "Comment added", comments: video.comments });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a comment from a video
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ error: "Video not found" });

        const commentIndex = video.comments.findIndex(
            (c) => c._id.toString() === commentId
        );
        if (commentIndex === -1) {
            return res.status(404).json({ error: "Comment not found" });
        }

        video.comments.splice(commentIndex, 1);
        await video.save();
        res.json({ message: "Comment deleted", comments: video.comments });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo,
    addComment,
    deleteComment
};
