import React from 'react'
import './globals.css';
import { Prompt } from 'next/font/google';

const prompt = Prompt({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
  
});

export default function Footer() {
  return (
    <footer
      className={`${prompt.className} relative bg-cover bg-no-repeat text-white px-10 py-12 mt-3`}
      style={{ backgroundImage: "url('/gym.jpg')" }}
    >
      {/* ✅ เลเยอร์โปร่งใสแบบเต็มพื้นที่ */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0" />

      {/* ✅ เนื้อหาด้านใน - อยู่เหนือเลเยอร์ */}
      <div className="relative z-10 max-w-7xl m-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
        {/* คอลัมน์ 1 */}
        <div>
          <h2 className="text-2xl font-bold mb-2">ติดตาม ERD ได้ที่</h2>
          <a href="https://line.me" target="_blank" rel="noopener noreferrer">
            <img src="/Line.png" alt="Line" className="w-10 h-10" />
          </a>
        </div>

        {/* คอลัมน์ 2 */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-1 text-sm text-white">
            <li><a href="/bmr" className="hover:underline hover:text-blue-500">เช็คการเผาผลาญพลังงาน BMR</a></li>
            <li><a href="/bmi" className="hover:underline hover:text-blue-500">เช็คดัชนีมวลกาย BMI</a></li>
            <li><a href="/articles" className="hover:underline hover:text-blue-500">บทความ</a></li>
            <li><a href="/programs" className="hover:underline hover:text-blue-500">โปรแกรมออกกำลังกาย</a></li>
          </ul>
        </div>

        {/* คอลัมน์ 3 */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Contact Us</h3>
          <ul className="text-sm space-y-1">
            <h2>ERD Space Online</h2>
            <li><a href="mailto:mongkohn.kubpom@gmail.com" className="text-blue-300 hover:underline hover:text-blue-500">mongkohn.kubpom@gmail.com</a></li>
            <li><a href="mailto:okm6344@gmail.com" className="text-blue-300 hover:underline hover:text-blue-500">okm6344@gmail.com</a></li>
          </ul>
          <ul>
            <h2 className='mt-4'>PHONE</h2>
            <li><a href="tel:0926241304" className="text-sm text-blue-300 hover:underline hover:text-blue-500">092-624-1304</a></li>
            <li><a href="tel:0927511329" className="text-sm text-blue-300 hover:underline hover:text-blue-500">092-751-1329</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

