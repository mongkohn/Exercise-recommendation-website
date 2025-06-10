const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // You can change this to other email services
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS  // Your app password (not regular password)
        }
    });
};

// Send OTP email
const sendOTPEmail = async (email, otp, username) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'รหัส OTP สำหรับรีเซ็ตรหัสผ่าน - ERD System',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
                    <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">ERD Exercise Recommendation</h1>
                        <p style="color: #e0e7ff; margin: 10px 0 0 0;">ระบบแนะนำการออกกำลังกาย</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #1e40af; margin-bottom: 20px;">สวัสดี ${username}!</h2>
                        
                        <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                            คุณได้ทำการขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ กรุณาใช้รหัส OTP ด้านล่างเพื่อยืนยันตัวตนของคุณ:
                        </p>
                        
                        <div style="background: #f1f5f9; border: 2px dashed #3b82f6; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
                            <h3 style="color: #1e40af; margin: 0 0 10px 0;">รหัส OTP ของคุณ:</h3>
                            <div style="font-size: 32px; font-weight: bold; color: #1e40af; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                ${otp}
                            </div>
                            <p style="color: #64748b; margin: 10px 0 0 0; font-size: 14px;">
                                (รหัสนี้จะหมดอายุใน 10 นาที)
                            </p>
                        </div>
                        
                        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                            <p style="color: #92400e; margin: 0; font-size: 14px;">
                                <strong>⚠️ คำเตือน:</strong> หากคุณไม่ได้ทำการขอรีเซ็ตรหัสผ่าน กรุณาเพิกเฉยต่ออีเมลนี้และติดต่อเราทันที
                            </p>
                        </div>
                        
                        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
                            <p style="color: #64748b; font-size: 14px; margin: 0; text-align: center;">
                                หากคุณมีคำถามใดๆ กรุณาติดต่อทีมสนับสนุน<br>
                                อีเมล: ${process.env.EMAIL_USER}
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
                        <p>© 2024 ERD Exercise Recommendation System. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendOTPEmail
};
