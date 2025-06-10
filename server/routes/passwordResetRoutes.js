const express = require('express');
const router = express.Router();
const { 
    requestPasswordReset, 
    verifyOTP, 
    resetPassword, 
    resendOTP 
} = require('../controller/passwordResetController');

// Request password reset (send OTP)
router.post('/request-reset', requestPasswordReset);

// Verify OTP
router.post('/verify-otp', verifyOTP);

// Reset password with verified OTP
router.post('/reset-password', resetPassword);

// Resend OTP
router.post('/resend-otp', resendOTP);

module.exports = router;
