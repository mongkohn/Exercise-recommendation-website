'use client';
import FeedbackSection from "@/components/FeedbackSection";


const workoutData = {
  id: 1,
  name: "PROGRAM 1",
  videoUrl: "https://drive.google.com/file/d/1uniMG91kgmaJfp8omHg5puteH3fu-WZV/preview",
  description: [
    "1. โน้มตัวไปข้างหน้า 45 องศา",
    "2. ให้จับบาร์กว้างกว่าไหล่",
    "3. ดึงข้อศอกไปด้านหลัง เกร็งหลัง",
  ],
  equipment: ["🛠️ บาร์เบล"],
  muscles: ["หน้าแขน", "หลัง"],
};

export default function WorkoutView() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* หัวข้อ */}
      <h1 className="text-3xl font-bold mb-8">{workoutData.name}</h1>
    <div>
    </div>
      {/* วิดีโอและคำอธิบาย */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className=" w-full aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow"
            src={workoutData.videoUrl}
            title={workoutData.name}
            allowFullScreen
          />
        </div>
      </div>
      {/* อุปกรณ์ */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">อุปกรณ์ที่ใช้</h2>
        <div className="flex flex-wrap gap-2">
          {workoutData.equipment.map((item, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{item}</span>
          ))}
        </div>
      </div>

      {/* กล้ามเนื้อ */}
      <div>
        <h2 className="font-semibold text-lg mb-2">กล้ามเนื้อ</h2>
        <div className="flex flex-wrap gap-2">
          {workoutData.muscles.map((muscle, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{muscle}</span>
          ))}
        </div>
      </div>

      <hr className="w-full mt-10 border border-gray-300" />
      <FeedbackSection />
    </div>
  );
}
