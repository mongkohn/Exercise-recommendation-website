'use client';
import FeedbackSection from "@/components/FeedbackSection";

export default function WorkoutView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* หัวข้อ */}
      <h1 className="text-3xl font-bold mb-4">Reverse Lunge to Chop</h1>

      {/* วิดีโอ */}
      <div className="mb-6 aspect-video">
        <iframe
          className="w-full h-full rounded-lg shadow"
          src="https://drive.google.com/file/d/1uniMG91kgmaJfp8omHg5puteH3fu-WZV/preview"
          title="Reverse Lunge to Chop"
        />
      </div>

      {/* อุปกรณ์ที่ใช้ */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2">อุปกรณ์ที่ใช้</h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">บาร์เบล</span>
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
      <FeedbackSection/>
    </div>
  );
}
