const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    articleId: { 
        type: String, 
        required: true,
        index: true // To efficiently query comments by articleId
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model
        required: true 
    },
    username: { // Storing username directly for easier display
        type: String,
        required: true
    },
    text: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Comment', commentSchema);
