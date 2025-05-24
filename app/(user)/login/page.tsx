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
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col md:flex-row shadow-xl rounded-lg overflow-hidden">
        {/* ซ้าย: ภาพเด็กเล่นฟุตบอล */}
        <div className="md:w-1/2 bg-white p-6 flex items-center justify-center">
          <Image
            src="/logo.jpeg"
            alt="image"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
        {/* ขวา: ฟอร์ม login */}
        <div className="md:w-1/2 p-8">
          {/* Navbar */}
          <div className="flex justify-end mb-6 text-sm font-bold">
            <span className="mx-2">|</span>
            <Link href="/register" className="text-black hover:text-blue-500">สมัครสมาชิก</Link>
          </div>
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">Username</label>
              <input
                id="username"
                type="text"
                placeholder="ไอดี"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              />
            </div>
            <div>
              <Link href="#" className="text-sm font-bold hover:text-blue-500">ลืมรหัสผ่าน</Link>
            </div>            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-500 transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
