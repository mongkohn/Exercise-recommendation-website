import React from 'react'
import '@/app/globals.css';
import { Prompt } from 'next/font/google';
import { Mail, Phone, ExternalLink, Heart } from 'lucide-react';
import Image from 'next/image';

const prompt = Prompt({
  subsets: ['thai'],
  weight: ['400', '800', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
});

export default function Footer() {
  return (
    <footer className={`${prompt.className} relative overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/gym.jpg"
          alt="Gym Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/70 to-slate-700/60" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  ERD Space
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed max-w-md">
                  แพลตฟอร์มออนไลน์สำหรับการออกกำลังกายและดูแลสุขภาพ พร้อมบทความ โปรแกรม และเครื่องมือคำนวณที่ครบครัน
                </p>
              </div>
              
              {/* Social Media */}
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  ติดตาม ERD ได้ที่
                </h3>
                <a 
                  href="https://line.me/R/ti/p/@624ahpmn?ts=06010100&oat_content=url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all duration-300 border border-white/20"
                >
                  <Image src="/Line.png" alt="Line" width={24} height={24} />
                  <span className="font-medium">Line Official</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">เมนูหลัก</h3>
              <ul className="space-y-3">
                {/*
                  { href: "/bmr&tdee", label: "คำนวณ BMR & TDEE" },
                  { href: "/workouts", label: "ท่าออกกำลังกาย" },
                  { href: "/articles", label: "บทความแนะนำ" },
                */}
                {/*
                { [
                  { href: "/bmi", label: "เช็คดัชนีมวลกาย BMI" },
                  { href: "/bmr&tdee", label: "คำนวณ BMR & TDEE" },
                  { href: "/workouts", label: "ท่าออกกำลังกาย" },
                  { href: "/articles", label: "บทความแนะนำ" },
                ].map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-white transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
                */}
                <li>
                  <a 
                    href="/bmi" 
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-white transition-colors" />
                    เช็คดัชนีมวลกาย BMI
                  </a>
                </li>
                <li>
                  <a 
                    href="/bmr&tdee" 
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-white transition-colors" />
                    คำนวณ BMR & TDEE
                  </a>
                </li>
                <li>
                  <a 
                    href="/workouts" 
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-white transition-colors" />
                    ท่าออกกำลังกาย
                  </a>
                </li>
                <li>
                  <a 
                    href="/articles" 
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-white transition-colors" />
                    บทความแนะนำ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">ติดต่อเรา</h3>
              
              {/* Email Section */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  อีเมล
                </h4>
                <div className="space-y-2">
                  {/*
                    "mongkohn.kubpom@gmail.com",
                    "okm6344@gmail.com"
                  */}
                  <a 
                    href="mailto:mongkohn.kubpom@gmail.com"
                    className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm"
                  >
                    mongkohn.kubpom@gmail.com
                  </a>
                  <a 
                    href="mailto:okm6344@gmail.com"
                    className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm"
                  >
                    okm6344@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Section */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  โทรศัพท์
                </h4>
                <div className="space-y-2">
                  {/*
                    "092-624-1304",
                    "092-751-1329"
                  */}
                  <a 
                    href="tel:0926241304"
                    className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm"
                  >
                    092-624-1304
                  </a>
                  <a 
                    href="tel:0927511329"
                    className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm"
                  >
                    092-751-1329
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-blue-200 text-sm">
                © {new Date().getFullYear()} ERD Space Online. สงวนลิขสิทธิ์ทั้งหมด
              </p>
              <div className="flex items-center gap-6 text-sm text-blue-200">
                <a href="/privacy" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a>
                <a href="/terms" className="hover:text-white transition-colors">เงื่อนไขการใช้งาน</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

