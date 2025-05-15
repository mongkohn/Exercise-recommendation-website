"use client";

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    fullname: '',
    gender: '',
    birthday: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (
      !form.username ||
      !form.email ||
      !form.fullname ||
      !form.gender ||
      !form.birthday ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          fullname: form.fullname,
          gender: form.gender,
          birthday: form.birthday,
          password: form.password
        })
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/login');
      } else {
        setError(data.message || 'สมัครสมาชิกไม่สำเร็จ');
      }
    } catch {
      setError('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-5xl">
        {/* ซ้าย: โลโก้ */}
        <div className="md:w-1/2 bg-white p-6 flex flex-col items-center justify-center">
          <Image
            src="/logo.jpeg"
            alt="ERD Logo"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
        {/* ขวา: ฟอร์มสมัคร */}
        <div className="md:w-1/2 p-8">
          {/* Navbar */}
          <div className="flex justify-end mb-6 text-sm font-bold">
            <Link href="/login" className="text-black hover:text-blue-500">เข้าสู่ระบบ</Link>
            <span className="mx-2">|</span>
          </div>
          {/* Error message */}
          {error && (
            <div className="mb-4 text-red-600 text-sm font-semibold">{error}</div>
          )}
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block mb-1 font-medium ">Username</label>
              <input
                id="username"
                type="text"
                placeholder="ไอดี"
                className="w-full px-4 py-2 border rounded-md placeholder-gray-400 bg-white  focus:ring-2 focus:ring-blue-600"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="อีเมล"
                className="w-full px-4 py-2 border  rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="fullname" className='block mb-1 font-medium'>ชื่อ</label>
              <input
                id="fullname"
                type="text"
                placeholder='ชื่อ-นามสกุล'
                className='w-full px-4 py-2 border  rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600'
                value={form.fullname}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="gender" className='block mb-1 font-medium'>เพศ</label>
              <input
                id="gender"
                type="text"
                placeholder='เพศ'
                className='w-full px-4 py-2 border  rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600'
                value={form.gender}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="birthday" className="block mb-1 font-medium">ปีเกิด</label>
              <input
                id="birthday"
                type="date"
                className="w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-600"
                value={form.birthday}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                onFocus={(e) => {
                  try {
                    // แสดง date picker ถ้า browser รองรับ
                    if (typeof e.target.showPicker === 'function') {
                      e.target.showPicker();
                    }
                  } catch (err) {
                    // fallback: ไม่ต้องทำอะไร
                  }
                }}
              />

            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="รหัสผ่าน"
                className="w-full px-4 py-2 border rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm-Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="ยืนยันรหัสผ่าน"
                className="w-full px-4 py-2 border rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-500 transition"
              disabled={loading}
            >
              {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
