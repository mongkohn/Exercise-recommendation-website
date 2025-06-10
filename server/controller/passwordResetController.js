const User = require('../models/userSchema');
const OTP = require('../models/otpSchema');
const { sendOTPEmail } = require('../config/email');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request password reset (send OTP)
const requestPasswordReset = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'กรุณาระบุชื่อผู้ใช้' });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'ไม่พบชื่อผู้ใช้นี้ในระบบ' });
        }

        if (!user.email) {
            return res.status(400).json({ error: 'ผู้ใช้นี้ไม่มีอีเมลที่ลงทะเบียนไว้' });
        }

        // Generate OTP
        const otp = generateOTP();

        // Delete any existing OTP for this user
        await OTP.deleteMany({ username: user.username });

        // Save new OTP to database
        const otpDoc = new OTP({
            username: user.username,
            email: user.email,
            otp: otp
        });
        await otpDoc.save();

        // Send OTP email
        const emailResult = await sendOTPEmail(user.email, otp, user.username);
        
        if (!emailResult.success) {
            return res.status(500).json({ 
                error: 'ไม่สามารถส่งอีเมลได้ กรุณาลองใหม่อีกครั้ง',
                details: emailResult.error 
            });
        }

        res.json({ 
            message: 'ส่งรหัส OTP ไปยังอีเมลของคุณแล้ว กรุณาตรวจสอบอีเมล',
            email: user.email.replace(/(.{2}).*(@.*)/, '$1***$2') // Mask email for security
        });

    } catch (error) {
        console.error('Error in requestPasswordReset:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการขอรีเซ็ตรหัสผ่าน' });
    }
};

// Verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { username, otp } = req.body;

        if (!username || !otp) {
            return res.status(400).json({ error: 'กรุณาระบุชื่อผู้ใช้และรหัส OTP' });
        }

        // Find valid OTP
        const otpDoc = await OTP.findOne({ 
            username, 
            otp, 
            isUsed: false 
        });

        if (!otpDoc) {
            return res.status(400).json({ error: 'รหัส OTP ไม่ถูกต้องหรือหมดอายุแล้ว' });
        }

        // Mark OTP as used (but don't delete yet, in case user needs to reset password)
        otpDoc.isUsed = true;
        await otpDoc.save();

        res.json({ 
            message: 'ยืนยันรหัส OTP สำเร็จ',
            token: otpDoc._id // Use OTP document ID as temporary token
        });

    } catch (error) {
        console.error('Error in verifyOTP:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการยืนยัน OTP' });
    }
};

// Reset password with verified OTP
const resetPassword = async (req, res) => {
    try {
        const { username, newPassword, token } = req.body;

        if (!username || !newPassword || !token) {
            return res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร' });
        }

        // Verify token (OTP document ID)
        const otpDoc = await OTP.findById(token);
        if (!otpDoc || otpDoc.username !== username || !otpDoc.isUsed) {
            return res.status(400).json({ error: 'ข้อมูลการยืนยันไม่ถูกต้องหรือหมดอายุ' });
        }

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
        }

        // Hash new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        // Delete the used OTP
        await OTP.findByIdAndDelete(token);

        res.json({ message: 'รีเซ็ตรหัสผ่านสำเร็จ' });

    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน' });
    }
};

// Resend OTP
const resendOTP = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'กรุณาระบุชื่อผู้ใช้' });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'ไม่พบชื่อผู้ใช้นี้ในระบบ' });
        }

        // Check rate limiting (prevent spam)
        const recentOTP = await OTP.findOne({ 
            username: user.username,
            createdAt: { $gte: new Date(Date.now() - 60000) } // Last 1 minute
        });

        if (recentOTP) {
            return res.status(429).json({ 
                error: 'กรุณารอ 1 นาทีก่อนขอรหัส OTP ใหม่' 
            });
        }

        // Generate new OTP
        const otp = generateOTP();

        // Delete old OTPs for this user
        await OTP.deleteMany({ username: user.username });

        // Save new OTP
        const otpDoc = new OTP({
            username: user.username,
            email: user.email,
            otp: otp
        });
        await otpDoc.save();

        // Send OTP email
        const emailResult = await sendOTPEmail(user.email, otp, user.username);
        
        if (!emailResult.success) {
            return res.status(500).json({ 
                error: 'ไม่สามารถส่งอีเมลได้ กรุณาลองใหม่อีกครั้ง' 
            });
        }

        res.json({ 
            message: 'ส่งรหัส OTP ใหม่แล้ว กรุณาตรวจสอบอีเมล' 
        });

    } catch (error) {
        console.error('Error in resendOTP:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการส่งรหัส OTP ใหม่' });
    }
};

module.exports = {
    requestPasswordReset,
    verifyOTP,
    resetPassword,
    resendOTP
};
