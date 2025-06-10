"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Shield, RefreshCw, Eye, EyeOff } from 'lucide-react';

type Step = 'username' | 'otp' | 'newPassword';

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>('username');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  // Start countdown for resend OTP
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/password-reset/request-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMaskedEmail(data.email);
        setStep('otp');
        startCountdown();
      } else {
        setError(data.error || 'เกิดข้อผิดพลาด');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/password-reset/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setToken(data.token);
        setStep('newPassword');
      } else {
        setError(data.error || 'รหัส OTP ไม่ถูกต้อง');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/password-reset/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, newPassword, token }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('รีเซ็ตรหัสผ่านสำเร็จ! กำลังนำคุณไปหน้าเข้าสู่ระบบ...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.error || 'เกิดข้อผิดพลาด');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/password-reset/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        startCountdown();
      } else {
        setError(data.error || 'ไม่สามารถส่งรหัส OTP ใหม่ได้');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'username':
        return (
          <form onSubmit={handleRequestReset} className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">ลืมรหัสผ่าน</h2>
              <p className="text-blue-600">กรุณาใส่ชื่อผู้ใช้เพื่อขอรีเซ็ตรหัสผ่าน</p>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-blue-900 mb-2">
                ชื่อผู้ใช้
              </label>
              <input
                id="username"
                type="text"
                placeholder="กรุณาใส่ชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  กำลังส่งรหัส OTP...
                </div>
              ) : (
                'ส่งรหัส OTP'
              )}
            </button>
          </form>
        );

      case 'otp':
        return (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">ยืนยันรหัส OTP</h2>
              <p className="text-blue-600 mb-2">
                เราได้ส่งรหัส OTP ไปยังอีเมล
              </p>
              <p className="text-blue-800 font-semibold">{maskedEmail}</p>
              <p className="text-sm text-blue-500 mt-2">
                (รหัส OTP จะหมดอายุใน 10 นาที)
              </p>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-blue-900 mb-2">
                รหัส OTP (6 หลัก)
              </label>
              <input
                id="otp"
                type="text"
                placeholder="ใส่รหัส OTP 6 หลัก"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400 text-center text-xl tracking-widest font-mono"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  กำลังยืนยัน...
                </div>
              ) : (
                'ยืนยันรหัส OTP'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-blue-600 mb-2">ไม่ได้รับรหัส OTP?</p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={countdown > 0 || loading}
                className="text-blue-600 hover:text-blue-800 font-medium underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {countdown > 0 ? `ส่งใหม่ใน ${countdown} วินาที` : 'ส่งรหัส OTP ใหม่'}
              </button>
            </div>
          </form>
        );

      case 'newPassword':
        return (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">ตั้งรหัสผ่านใหม่</h2>
              <p className="text-blue-600">กรุณาใส่รหัสผ่านใหม่สำหรับบัญชีของคุณ</p>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-blue-900 mb-2">
                รหัสผ่านใหม่
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="กรุณาใส่รหัสผ่านใหม่"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-blue-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-blue-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-blue-500 mt-1">รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-900 mb-2">
                ยืนยันรหัสผ่านใหม่
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="กรุณายืนยันรหัสผ่านใหม่"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-blue-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-blue-400" />
                  )}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">รหัสผ่านไม่ตรงกัน</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || newPassword !== confirmPassword || newPassword.length < 6}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  กำลังรีเซ็ตรหัสผ่าน...
                </div>
              ) : (
                'รีเซ็ตรหัสผ่าน'
              )}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://th.bing.com/th/id/R.19afe73d4d75be7dec5057f0353a72f3?rik=p7CGNPSqpqgDDw&riu=http%3a%2f%2fblackfitness.co%2fwp-content%2fuploads%2f2018%2f04%2fcropped-FOTOS-BLACK-FITNESS-2018-2-1.jpg&ehk=MsdjM3A56nbZLslQw6x7w7%2fvfEMUKm4bMHx1M8Pv%2bi0%3d&risl=&pid=ImgRaw&r=0"
          alt="Fitness Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-50/80 to-white/90 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            ย้อนกลับ
          </Link>

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex space-x-2">
                <div className={`w-3 h-3 rounded-full ${step === 'username' ? 'bg-blue-600' : step === 'otp' || step === 'newPassword' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`w-3 h-3 rounded-full ${step === 'otp' ? 'bg-blue-600' : step === 'newPassword' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`w-3 h-3 rounded-full ${step === 'newPassword' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              </div>
            </div>

            {/* Message/Error Display */}
            {message && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 text-sm text-center">{message}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Step Content */}
            {renderStepContent()}

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-blue-100">
              <p className="text-blue-600 text-sm">
                จำรหัสผ่านได้แล้ว?{' '}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  เข้าสู่ระบบ
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
