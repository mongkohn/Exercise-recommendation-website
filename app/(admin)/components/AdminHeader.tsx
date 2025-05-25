"use client";

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-blue-100 shadow-sm flex items-center justify-between px-6">
      <div className="text-xl font-semibold text-blue-900">Dashboard</div>
      <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full text-sm font-medium text-blue-800 shadow-sm">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          A
        </div>
        <span>ผู้ดูแลระบบ</span>
      </div>
    </header>
  );
}
