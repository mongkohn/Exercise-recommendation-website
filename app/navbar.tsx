"use client";

import { ChevronDown, User2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <div>
            <p className="text-lg font-bold text-blue-900">ERD</p>
            <span className="text-sm text-muted-foreground">Website</span>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex gap-6 items-center text-blue-900 font-medium {styles.tital}">
          <div className="relative group">
            <button className="flex items-center gap-1">
              การเผาผลาญต่อวัน
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown */}
            <div className="absolute top-full mt-2 left-0 bg-white border rounded shadow-md hidden group-hover:block z-10 w-48">
              <Link href="/bmr" className="block px-4 py-2 hover:bg-blue-50">
                คำนวณ BMR
              </Link>
              <Link href="/tdee" className="block px-4 py-2 hover:bg-blue-50">
                คำนวณ TDEE
              </Link>
            </div>
          </div>
          <Link href="/workouts">ท่าการออกกำลังกาย</Link>
          <Link href="/programs">โปรแกรมออกกำลังกาย</Link>
          <Link href="/contact">ช่องทางติดต่อ</Link>
          <Link href="/articles">บทความ</Link>
          <Link href="/history">ประวัติ</Link>
        </nav>

        {/* User Icon */}
        <Link href="/profile">
          <User2 className="w-6 h-6 text-black" />
        </Link>
      </div>
    </header>
  );
}
