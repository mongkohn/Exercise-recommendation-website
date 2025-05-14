'use client';
import FeedbackSection from "@/components/FeedbackSection";


export default function WorkoutView() {
  const data = {
    id: 2,
    name: "Dumbbell One Arm Press",
    videoUrl: "https://drive.google.com/file/d/1in4KYaCJ51cy-ogFG0yshgXT5SDSGZYL/preview",
    description: [
      "1. ยกดัมเบลขึ้นด้วยแขนข้างเดียว ให้แขนเหยียดตรง",
      "2. ใช้มือยึดจับ เพื่อให้มั่นคง",
      "3. ดึงดัมเบลขึ้นมาชิดลำตัว",
      "4. โดยพยายามบีบกล้ามเนื้อหลังให้ได้มากที่สุด",
    ],
    equipment: ["🛠️ ดัมเบล"],
    muscles: ["หน้าแขน", "หลัง"],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{data.name}</h1>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-2/3 w-full aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow"
            src={data.videoUrl}
            title={data.name}
            allowFullScreen
          />
        </div>

        <div className="flex-1 border p-6 rounded-lg shadow bg-white">
          <h2 className="text-xl font-semibold mb-4">อธิบายท่าออกกำลังกาย</h2>
          <div className="text-gray-700 p-3">
            {data.description.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">อุปกรณ์ที่ใช้</h2>
        <div className="flex flex-wrap gap-2">
          {data.equipment.map((item, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{item}</span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">กล้ามเนื้อ</h2>
        <div className="flex flex-wrap gap-2">
          {data.muscles.map((muscle, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{muscle}</span>
          ))}
        </div>
      </div>

      <hr className="w-full mt-10 border border-gray-300" />
      <FeedbackSection />
    </div>
  );
}
