"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from "@/components/ui/calendar";
import { format, getMonth, getYear, isValid } from "date-fns";
import { th } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = {
  username: string;
  email: string;
  fullname: string;
  gender: string;
  birthday: string;
  password: string;
  confirmPassword: string;
};

const CustomCaption = ({ date, onChange }: { date: Date; onChange: (date: Date) => void; }) => {
  const safeDate = isValid(date) ? date : new Date();
  const currentYear = getYear(new Date());
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i).reverse();
  const months = Array.from({ length: 12 }, (_, i) => format(new Date(2020, i), "LLLL", { locale: th }));

  return (
    <div className="flex justify-center space-x-2 mb-2 p-2">
      <select
        className="border border-blue-200 rounded-lg px-3 py-1 text-sm bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={getMonth(safeDate)}
        onChange={(e) => onChange(new Date(getYear(safeDate), +e.target.value, 1))}
      >
        {months.map((month, i) => <option key={month} value={i}>{month}</option>)}
      </select>
      <select
        className="border border-blue-200 rounded-lg px-3 py-1 text-sm bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={getYear(safeDate)}
        onChange={(e) => onChange(new Date(+e.target.value, getMonth(safeDate), 1))}
      >
        {years.map((year) => <option key={year} value={year}>{year}</option>)}
      </select>
    </div>
  );
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({ username: '', email: '', fullname: '', gender: '', birthday: '', password: '', confirmPassword: '' });
  const [date, setDate] = useState<Date | undefined>();
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError(null);
  };

  const handleDisplayMonthChange = (newDate: Date) => {
    if (isValid(newDate)) {
      setDisplayMonth(newDate);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate && isValid(selectedDate)) {
      setDisplayMonth(selectedDate);
      setForm({ ...form, birthday: selectedDate.toISOString().split('T')[0] });
      setIsCalendarOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.username || !form.email || !form.fullname || !form.gender || !date || !form.password || !form.confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (!/^[a-zA-Z0-9_]{3,}$/.test(form.username)) {
      setError('Username ต้องมีอย่างน้อย 3 ตัวอักษร และใช้ได้เฉพาะ a-z, 0-9, _');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('รูปแบบอีเมลไม่ถูกต้อง');
      return;
    }

    if (form.password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setLoading(true);
    try {
      const checkRes = await fetch('http://localhost:5000/api/user/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, email: form.email }),
      });

      if (!checkRes.ok) throw new Error('Error checking duplicates');

      const { usernameExists, emailExists } = await checkRes.json();

      if (usernameExists || emailExists) {
        setError(usernameExists ? 'Username นี้ถูกใช้แล้ว' : 'Email นี้ถูกใช้แล้ว');
        return;
      }

      const res = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          fullname: form.fullname,
          gender: form.gender,
          birthday: date.toISOString().split('T')[0],
          password: form.password,
        }),
      });

      const data = await res.json();
      if (res.ok) router.push('/login');
      else setError(data.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');

    } catch (err) {
      setError('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Fitness Background"
          fill
          className="object-cover opacity-20"
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
                  เริ่มต้นการออกกำลังกาย
                </h1>
                <p className="text-blue-700 text-lg leading-relaxed">
                  สร้างบัญชีเพื่อเข้าถึงโปรแกรม
                  <br />
                  การออกกำลังกายที่เหมาะกับคุณ
                </p>
              </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">สมัครสมาชิก</h2>
                <p className="text-blue-600">สร้างบัญชีใหม่เพื่อเริ่มต้นใช้งาน</p>
              </div>

              {/* Login Link */}
              <div className="flex justify-end mb-6">
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
                >
                  มีบัญชีแล้ว? เข้าสู่ระบบ
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Register Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-blue-900 mb-2">
                    ชื่อผู้ใช้
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="ชื่อผู้ใช้"
                    autoComplete="username"
                    className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400"
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-2">
                    อีเมล
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="อีเมล"
                    autoComplete="email"
                    className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Full Name Field */}
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-blue-900 mb-2">
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="ชื่อ-นามสกุล"
                    className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400"
                    value={form.fullname}
                    onChange={handleChange}
                  />
                </div>

                {/* Gender and Birthday Row */}
                <div className="grid grid-cols-2 gap-4">

                  {/* Gender Field */}
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-blue-900 mb-2">
                      เพศ
                    </label>
                    <select
                      id="gender"
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">เลือกเพศ</option>
                      <option value="male">ชาย</option>
                      <option value="female">หญิง</option>
                      <option value="other">อื่นๆ</option>
                    </select>
                  </div>

                  {/* Birthday Field */}
                  <div>
                    <label htmlFor="birthday" className="block text-sm font-medium text-blue-900 mb-2">
                      วันเกิด
                    </label>
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="birthday"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left rounded-xl border border-blue-200 px-4 py-3 bg-blue-50 hover:bg-blue-100 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 font-normal",
                            !date && "text-blue-400"
                          )}
                          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                          {date && isValid(date) ? format(date, "d MMMM yyyy", { locale: th }) : <span>เลือกวันเกิด</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white rounded-xl shadow-xl border border-blue-200" align="start">
                        <div className="p-4">
                          <CustomCaption date={displayMonth} onChange={handleDisplayMonthChange} />
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            month={displayMonth}
                            onMonthChange={setDisplayMonth}
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                            locale={th}
                            initialFocus
                            className="rounded-lg bg-white text-blue-900 border-0"
                            classNames={{
                              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                              month: "space-y-4",
                              caption: "hidden",
                              caption_label: "text-sm font-medium",
                              nav: "space-x-1 flex items-center",
                              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                              nav_button_previous: "absolute left-1",
                              nav_button_next: "absolute right-1",
                              table: "w-full border-collapse space-y-1",
                              head_row: "flex",
                              head_cell: "text-blue-600 rounded-md w-9 font-normal text-[0.8rem]",
                              row: "flex w-full mt-2",
                              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 hover:text-blue-900 rounded-md transition-colors",
                              day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
                              day_today: "bg-blue-100 text-blue-900",
                              day_outside: "text-blue-300 opacity-50",
                              day_disabled: "text-blue-300 opacity-50",
                              day_range_middle: "aria-selected:bg-blue-100 aria-selected:text-blue-900",
                              day_hidden: "invisible",
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-2">
                      รหัสผ่าน
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="รหัสผ่าน"
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-900 mb-2">
                      ยืนยันรหัสผ่าน
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="ยืนยันรหัสผ่าน"
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-50 text-blue-900 placeholder-blue-400"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      กำลังสมัครสมาชิก...
                    </div>
                  ) : (
                    'สมัครสมาชิก'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}