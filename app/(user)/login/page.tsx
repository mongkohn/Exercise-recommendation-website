"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { isLoggedIn, login, isLoading } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await login(username, password);
      if (success) {
        router.push('/');
      } else {
        alert('เข้าสู่ระบบล้มเหลว');
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
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
          className="object-cover "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-50/80 to-white/90 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="w-full max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Left Side - Branding */}
            <div className="hidden md:flex flex-col items-center justify-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-12 border border-white/20">
              <div className="mb-8">
                <Image
                  src="/logo.jpeg"
                  alt="ERD Logo"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">
                  ยินดีต้อนรับสู่ ERD
                </h1>
                <p className="text-blue-700 text-lg leading-relaxed">
                  ระบบแนะนำการออกกำลังกายที่ดีที่สุด
                  <br />
                  เพื่อสุขภาพที่แข็งแรงของคุณ
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">เข้าสู่ระบบ</h2>
                <p className="text-blue-600">กรุณาใส่ข้อมูลเพื่อเข้าสู่ระบบ</p>
              </div>

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-blue-900 mb-2">
                    ชื่อผู้ใช้
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      type="text"
                      placeholder="กรุณาใส่ชื่อผู้ใช้"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-2">
                    รหัสผ่าน
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="กรุณาใส่รหัสผ่าน"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <Link
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      กำลังเข้าสู่ระบบ...
                    </div>
                  ) : (
                    'เข้าสู่ระบบ'
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-blue-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-blue-600 font-medium">หรือ</span>
                  </div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-blue-700">
                    ยังไม่มีบัญชี?{' '}
                    <Link
                      href="/register"
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
                    >
                      สมัครสมาชิกที่นี่
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
