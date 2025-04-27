// pages/index.js
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        {/* ส่วนเนื้อหาหลัก */}
        <h1 className="text-2xl font-bold">หน้าหลัก</h1>
      </div>
    </div>
  );
}
