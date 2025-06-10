const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // OTP expires after 10 minutes (600 seconds)
    },
    isUsed: {
        type: Boolean,
        default: false
    }
});

// Compound index for better query performance
otpSchema.index({ username: 1, otp: 1 });

module.exports = mongoose.model('OTP', otpSchema);
