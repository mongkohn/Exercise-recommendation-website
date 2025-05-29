"use client";

import { ChevronDown, User2, Menu, X, Calculator, Dumbbell, Calendar, FileText, History, Settings, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
  };

  const renderUserMenu = () => {
    if (isLoading) {
      return <div className="w-24 h-8 bg-blue-200 animate-pulse rounded-lg"></div>;
    }

    if (!isLoggedIn) {
      return (
        <Link href="/login" className="hover:text-blue-600 flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg transition-colors">
          <User2 className="w-5 h-5 text-blue-600" />
          <span className="text-blue-900 font-medium">เข้าสู่ระบบ</span>
        </Link>
      );
    }

    return (
      <div className="relative">
        <button
          type="button"
          className="hover:bg-blue-100 flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg transition-colors"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="text-blue-900 font-medium">{user?.username || 'User'}</span>
          <ChevronDown className="w-4 h-4 text-blue-600" />
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-blue-100 rounded-xl shadow-xl z-20 py-2">
            {user?.username === "Admin" && (
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-blue-900 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <Settings className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Dashboard</span>
              </Link>
            )}
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-blue-900 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <User2 className="w-5 h-5 text-blue-600" />
              <span className="font-medium">โปรไฟล์</span>
            </Link>
            {/* <Link
              href="/history"
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-blue-900 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <History className="w-5 h-5 text-blue-600" />
              <span className="font-medium">ประวัติ</span>
            </Link> */}
            <div className="border-t border-blue-100 my-2"></div>
            <button
              type="button"
              className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors w-full text-left"
              onClick={handleLogout}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">ออกจากระบบ</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-lg rounded-xl border border-blue-100">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.jpeg" alt="ERD Logo" height={80} width={80} className="rounded-lg" />
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="lg:hidden">
          <button 
            type="button" 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6 text-blue-600" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-2 items-center">
          
          {/* Home Button */}
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-blue-900 font-medium hover:bg-blue-50 rounded-lg transition-colors">
            <Home className="w-5 h-5 text-blue-600" />
            หน้าหลัก
          </Link>
          
          {/* Calculator Dropdown */}
          <div className="relative group">
            <button type="button" className="flex items-center gap-2 px-4 py-2 text-blue-900 font-medium hover:bg-blue-50 rounded-lg transition-colors">
              <Calculator className="w-5 h-5 text-blue-600" />
              การเผาผลาญต่อวัน
              <ChevronDown className="w-4 h-4 text-blue-600" />
            </button>
            <div className="absolute top-full left-0 z-10 mt-2 w-56 bg-white border border-blue-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
              <Link href="/bmi" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-blue-900 transition-colors">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="font-medium">คำนวณ BMI</span>
              </Link>
              <Link href="/bmr&tdee" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-blue-900 transition-colors">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="font-medium">คำนวณ BMR & TDEE</span>
              </Link>
            </div>
          </div>

          {/* Other Navigation Items */}
          <Link href="/workouts" className="flex items-center gap-2 px-4 py-2 text-blue-900 font-medium hover:bg-blue-50 rounded-lg transition-colors">
            <Dumbbell className="w-5 h-5 text-blue-600" />
            ท่าการออกกำลังกาย
          </Link>
          
          <Link href="/programs" className="flex items-center gap-2 px-4 py-2 text-blue-900 font-medium hover:bg-blue-50 rounded-lg transition-colors">
            <Calendar className="w-5 h-5 text-blue-600" />
            โปรแกรมออกกำลังกาย
          </Link>
          
          <Link href="/articles" className="flex items-center gap-2 px-4 py-2 text-blue-900 font-medium hover:bg-blue-50 rounded-lg transition-colors">
            <FileText className="w-5 h-5 text-blue-600" />
            บทความ
          </Link>

          {renderUserMenu()}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-blue-100 bg-blue-50/50 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-2">
            
            {/* Home Button for Mobile */}
            <Link href="/" className="flex items-center gap-3 px-3 py-2 text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
              <Home className="w-4 h-4 text-blue-600" />
              <span className="font-medium">หน้าหลัก</span>
            </Link>
            
            {/* Calculator Section */}
            <div className="space-y-2">
              <p className="text-blue-900 font-bold text-sm uppercase tracking-wide">เครื่องคำนวณ</p>
              <div className="ml-4 space-y-1">
                <Link href="/bmr&tdee" className="flex items-center gap-3 px-3 py-2 text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">คำนวณ BMR & TDEE</span>
                </Link>
                <Link href="/bmi" className="flex items-center gap-3 px-3 py-2 text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">คำนวณ BMI</span>
                </Link>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="space-y-1 border-t border-blue-200 pt-2">
              <Link href="/workouts" className="flex items-center gap-3 px-3 py-2 text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                <Dumbbell className="w-4 h-4 text-blue-600" />
                <span className="font-medium">ท่าการออกกำลังกาย</span>
              </Link>
              <Link href="/programs" className="flex items-center gap-3 px-3 py-2 text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="font-medium">โปรแกรมออกกำลังกาย</span>
              </Link>
              <Link href="/articles" className="flex items-center gap-3 px-3 py-2 text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="font-medium">บทความ</span>
              </Link>
              {isLoggedIn && (
                <Link href="/history" className="flex items-center gap-3 px-3 py-2 text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                  <History className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">ประวัติ</span>
                </Link>
              )}
            </div>

            {/* User Section */}
            <div className="border-t border-blue-200 pt-2">
              {isLoggedIn ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 bg-blue-100 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-blue-900 font-bold">{user?.username || 'User'}</span>
                  </div>
                  <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                    <User2 className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">โปรไฟล์</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">ออกจากระบบ</span>
                  </button>
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-3 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                  <User2 className="w-4 h-4" />
                  <span className="font-medium">เข้าสู่ระบบ</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}