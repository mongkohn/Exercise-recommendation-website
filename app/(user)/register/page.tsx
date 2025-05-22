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
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => format(new Date(2020, i), "LLLL", { locale: th }));

  return (
    <div className="flex justify-center space-x-2 mb-2">
      <select className="border rounded px-2 py-1 text-sm" value={getMonth(safeDate)} onChange={(e) => onChange(new Date(getYear(safeDate), +e.target.value, 1))}>
        {months.map((month, i) => <option key={month} value={i}>{month}</option>)}
      </select>
      <select className="border rounded px-2 py-1 text-sm" value={getYear(safeDate)} onChange={(e) => onChange(new Date(+e.target.value, getMonth(safeDate), 1))}>
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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError(null);
  };

  const handleDisplayMonthChange = (newDate: Date) => {
    if (isValid(newDate)) {
      setDisplayMonth(newDate);
      setDate(newDate);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-5xl">
        <div className="md:w-1/2 bg-white p-6 flex flex-col items-center justify-center">
          <Image src="/logo.jpeg" alt="ERD Logo" width={400} height={400} className="object-contain" />
        </div>

        <div className="md:w-1/2 p-8">
          <div className="flex justify-end mb-6 text-sm font-bold">
            <Link href="/login" className="text-black hover:text-blue-500">เข้าสู่ระบบ</Link>
            <span className="mx-2">|</span>
          </div>

          {error && <div className="mb-4 text-red-600 text-sm font-semibold">{error}</div>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {[{ id: 'username', label: 'Username', type: 'text', placeholder: 'ไอดี' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'อีเมล' },
              { id: 'fullname', label: 'ชื่อ', type: 'text', placeholder: 'ชื่อ-นามสกุล' }].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block mb-1 font-medium">{label}</label>
                <input
                  id={id} type={type} placeholder={placeholder} autoComplete={id}
                  className="w-full px-4 py-2 border rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600"
                  value={form[id as keyof FormState]} onChange={handleChange}
                />
              </div>
            ))}

            <div>
              <label htmlFor="gender" className="block mb-1 font-medium">เพศ</label>
              <select id="gender" className="w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-600" value={form.gender} onChange={handleChange}>
                <option value="">เลือกเพศ</option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">วันเกิด</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left rounded-md border px-4 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600", !date && "text-muted-foreground")}> <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />{date && isValid(date) ? format(date, "d MMMM yyyy", { locale: th }) : <span>เลือกวันเกิด</span>} </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white rounded-md shadow-lg border" align="start">
                  <Calendar
                    mode="single" selected={date} onSelect={(d) => { setDate(d); if (isValid(d)) setDisplayMonth(d); }}
                    fromYear={1900} toYear={new Date().getFullYear()} locale={th} month={displayMonth} year={getYear(displayMonth)}
                    components={{ Caption: (props) => <CustomCaption {...props} onChange={handleDisplayMonthChange} /> }}
                    captionLayout="dropdown" initialFocus className="rounded-md p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {[{ id: 'password', label: 'Password', placeholder: 'รหัสผ่าน' }, { id: 'confirmPassword', label: 'Confirm-Password', placeholder: 'ยืนยันรหัสผ่าน' }].map(({ id, label, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block mb-1 font-medium">{label}</label>
                <input id={id} type="password" placeholder={placeholder} className="w-full px-4 py-2 border rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600" value={form[id as keyof FormState]} onChange={handleChange} autoComplete="new-password" />
              </div>
            ))}

            <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-500 transition" disabled={loading}>{loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}