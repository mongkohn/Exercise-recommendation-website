"use client";

export default function DashboardHome() {
  return (
    <section className="p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          ระบบจัดการเว็บไซต์ ERD
        </h2>
        <p className="text-blue-700 text-lg mb-8">
          ใช้เมนูด้านซ้ายเพื่ออัพเดทข้อมูลต่าง ๆ บนเว็บไซต์
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-3">ท่าการออกกำลังกาย</h3>
            <p className="text-blue-700 text-sm">เพิ่ม / ลบ / แก้ไข ข้อมูลท่าออกกำลังกาย</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-3">โปรแกรมออกกำลังกาย</h3>
            <p className="text-blue-700 text-sm">ปรับปรุงและจัดตารางโปรแกรม</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-3">บทความสุขภาพ</h3>
            <p className="text-blue-700 text-sm">เพิ่มเนื้อหาใหม่หรือแก้ไขบทความ</p>
          </div>
        </div>
      </div>
    </section>
  );
}
