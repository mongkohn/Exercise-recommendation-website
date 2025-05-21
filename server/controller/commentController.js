const Comment = require('../models/commentSchema');
const User = require('../models/userSchema'); // To ensure user exists

// Create a new comment
const createComment = async (req, res) => {
    try {
        const { articleId, userId, username, text } = req.body;

        // Validate required fields
        if (!articleId || !userId || !username || !text) {
            return res.status(400).json({ message: 'Article ID, User ID, Username, and Text are required.' });
        }

        // Optional: Check if the user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        // Ensure the username provided matches the user's actual username (or fullname for display)
        // For this implementation, we trust the 'username' field from the request, 
        // assuming it's correctly retrieved and sent by the frontend (e.g., from session).

        const newComment = new Comment({
            articleId,
            userId,
            username, // This should be the display name (e.g., user's username or fullname)
            text
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Failed to create comment.', error: error.message });
    }
};

// Get all comments for a specific article
const getCommentsByArticleId = async (req, res) => {
    try {
        const { articleId } = req.params;
        if (!articleId) {
            return res.status(400).json({ message: 'Article ID is required.' });
        }

        const comments = await Comment.find({ articleId })
            .sort({ createdAt: -1 }) // Sort by newest first
            .populate('userId', 'username fullname'); // Optionally populate user details if needed, though username is already stored.

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Failed to fetch comments.', error: error.message });
    }
};

module.exports = {
    createComment,
    getCommentsByArticleId
};
