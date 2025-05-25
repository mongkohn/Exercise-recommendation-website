"use client";

import { useState } from "react";

type AdminSidebarProps = {
  onSelect: (menu: string) => void;
};

export default function AdminSidebar({ onSelect }: AdminSidebarProps) {
  const [activeMenu, setActiveMenu] = useState("home");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    onSelect(menu);
  };

  return (
    <aside className="w-72 bg-white border-r border-blue-100 flex flex-col justify-between shadow-lg">
      <div>
        <div className="flex items-center justify-center h-24 border-b border-blue-100 bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-md">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-wider">ERD</h1>
            </div>
            <p className="text-sm font-medium tracking-wide text-blue-100">
              Admin Dashboard
            </p>
          </div>
        </div>

        <nav className="px-6 py-6 space-y-2">
          <SidebarItem
            label="หน้าหลัก"
            onClick={() => handleMenuClick("home")}
            isActive={activeMenu === "home"}
          />
          <SidebarItem
            label="จัดการท่าออกกำลังกาย"
            onClick={() => handleMenuClick("exercise")}
            isActive={activeMenu === "exercise"}
          />
          <SidebarItem
            label="จัดการโปรแกรม"
            onClick={() => handleMenuClick("program")}
            isActive={activeMenu === "program"}
          />
          <SidebarItem
            label="จัดการบทความ"
            onClick={() => handleMenuClick("articles")}
            isActive={activeMenu === "articles"}
          />
          <SidebarItem
            label="จัดการบัญชีผู้ใช้"
            onClick={() => handleMenuClick("users")}
            isActive={activeMenu === "users"}
          />
        </nav>
      </div>

      <div className="px-6 py-4 border-t border-blue-100">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium border border-red-200 hover:border-red-300"
        >
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({
  label,
  onClick,
  isActive = false,
}: {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium border ${
        isActive
          ? "bg-blue-100 text-blue-800 border-blue-200"
          : "hover:bg-blue-50 text-blue-900 hover:text-blue-800 border-transparent hover:border-blue-200"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          isActive ? "bg-blue-800" : "bg-blue-600"
        }`}
      />
      <span>{label}</span>
    </button>
  );
}
