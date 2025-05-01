'use client';
import FeedbackSection from "@/components/FeedbackSection";

export default function WorkoutView() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* หัวข้อ */}
      <h1 className="text-3xl font-bold mb-8">Bent Over Rows</h1>

      {/* ส่วนวิดีโอและคำอธิบาย */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* วิดีโอ */}
        <div className="md:w-2/3 w-full aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow"
            src="https://drive.google.com/file/d/1uniMG91kgmaJfp8omHg5puteH3fu-WZV/preview"
            title="Reverse Lunge to Chop"
            allowFullScreen
          />
        </div>

        {/* คำอธิบาย */}
        <div className="flex-1 border p-6 rounded-lg shadow bg-white">
          <h2 className="text-xl font-semibold mb-4">อธิบายท่าออกกำลังกาย</h2>
          <div className="text-gray-700 p-3">
            <p>1. โน้มตัวไปข้างหน้า 45 องศา</p>
            <p>2. ให้จับบาร์กว้างกว่าไหล่</p>
            <p>3. ดึงข้อศอกไปด้านหลัง เกร็งหลัง</p>
          </div>
        </div>
      </div>

      {/* อุปกรณ์ที่ใช้ */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">อุปกรณ์ที่ใช้</h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">🛠️ บาร์เบล</span>
        </div>
      </div>

      {/* กล้ามเนื้อที่ใช้ */}
      <div>
        <h2 className="font-semibold text-lg mb-2">กล้ามเนื้อ</h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">หน้าแขน</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">หลัง</span>
        </div>
      </div>

      <hr className="w-full mt-10 border border-gray-300" />
      <FeedbackSection />
    </div>
  );
}
