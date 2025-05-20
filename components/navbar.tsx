"use client";

import { ChevronDown, User2, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLogin(sessionStorage.getItem("isLogin") === "true");
      setUsername(sessionStorage.getItem("username"));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    window.location.reload();
  };

  const renderUserMenu = () => {
    if (!isLogin) {
      return (
        <Link href="/login" className="hover:text-blue-400 flex items-center gap-2">
          <User2 className="w-6 h-6 text-black" />
          เข้าสู่ระบบ
        </Link>
      );
    }
    return (
      <div className="relative">
        <button
          type="button"
          className="hover:text-blue-400 flex items-center gap-2"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <User2 className="w-6 h-6 text-black" />
          {username}
          <ChevronDown className="w-4 h-4" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-20">
            {username === "Admin" && (
              <Link
                href="/dashboard"
                className="block w-full text-left px-4 py-2 hover:bg-blue-50"
              >
                Dashboard
              </Link>
            )}
            <button
              type="button"
              className="block w-full text-left px-4 py-2 hover:bg-blue-50"
              onClick={handleLogout}
            >
              ออกจากระบบ
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-md rounded-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-1 ">
        {/* Logo */}
        <Link href="/" className="">
          <img src="/logo.jpeg" alt="logo" height={90} width={90} />
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="lg:hidden">
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Full menu on desktop */}
        <div className="hidden lg:flex gap-6 items-center text-blue-900 font-medium">
          <div className="relative group">
            <button type="button" className="flex items-center gap-1 hover:text-blue-400">
              การเผาผลาญต่อวัน
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-0 z-10 mt-2 w-48 bg-white border rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/bmr&tdee" className="block px-4 py-2 hover:bg-blue-50">
                คำนวณ BMR & TDEE
              </Link>
              <Link href="/bmi" className="block px-4 py-2 hover:bg-blue-50">
                คำนวณ BMI
              </Link>
            </div>
          </div>
          <Link href="/workouts" className="hover:text-blue-400">ท่าการออกกำลังกาย</Link>
          <Link href="/programs" className="hover:text-blue-400">โปรแกรมออกกำลังกาย</Link>
          <Link href="/contact" className="hover:text-blue-400">ช่องทางติดต่อ</Link>
          <Link href="/articles" className="hover:text-blue-400">บทความ</Link>
          {renderUserMenu()}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 text-blue-900 font-medium space-y-2">
          <div className="border-t pt-2">
            <div>
              <p className="font-semibold">การเผาผลาญต่อวัน</p>
              <div className="ml-4 space-y-1">
                <Link href="/bmr&tdee" className="block hover:text-blue-400">คำนวณ BMR & TDEE</Link>
                <Link href="/bmi" className="block hover:text-blue-400">คำนวณ BMI</Link>
              </div>
            </div>
            <Link href="/workouts" className="block hover:text-blue-400">ท่าการออกกำลังกาย</Link>
            <Link href="/programs" className="block hover:text-blue-400">โปรแกรมออกกำลังกาย</Link>
            <Link href="/contact" className="block hover:text-blue-400">ช่องทางติดต่อ</Link>
            <Link href="/articles" className="block hover:text-blue-400">บทความ</Link>
            <Link href="/history" className="block hover:text-blue-400">ประวัติ</Link>
            <Link href="/login" className="hover:text-blue-400 flex items-center gap-2">
              <User2 className="w-5 h-5" />
              {isLogin ? username : "เข้าสู่ระบบ"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}