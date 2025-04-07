"use client";

import { ChevronDown, User2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md rounded-xl">
            <div className="container mx-auto flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="">
                <img src="logo.jpeg" alt="logo" height={90} width={90} />
              </Link>

              {/* Menu */}
              <nav className="flex gap-6 items-center text-blue-900 font-medium">
                <div className="relative group">
                  <button className="flex items-center gap-1 hover:text-blue-400">
                    การเผาผลาญต่อวัน
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {/* Dropdown */}
                  <div className="absolute top-full left-0 z-10 mt-2 w-48 bg-white border rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/bmr" className="block px-4 py-2 hover:bg-blue-50">
                      คำนวณ BMR
                    </Link>
                    <Link href="/bmi" className="block px-4 py-2 hover:bg-blue-50">
                      คำนวณ BMI
                    </Link>
                  </div>
                </div >
                <Link href="/workouts" className="hover:text-blue-400" >ท่าการออกกำลังกาย</Link>
                <Link href="/programs" className="hover:text-blue-400">โปรแกรมออกกำลังกาย</Link>
                <Link href="/contact"  className="hover:text-blue-400">ช่องทางติดต่อ</Link>
                <Link href="/articles" className="hover:text-blue-400">บทความ</Link>
                <Link href="/history"  className="hover:text-blue-400">ประวัติ</Link>
              </nav>

              {/* User Icon */}
              <Link href="#">
                <User2 className="w-6 h-6 text-black hover:text-blue-400  "  />
              </Link>
            </div>
          </nav>
  );
}
