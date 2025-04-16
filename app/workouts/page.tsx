import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import FilterModal from "../FilterModal";

const workouts = [
  {
    title: "Bent Over Rows",
    muscles: ["หลัง","หน้าแขน"],
    equipment: " บาร์เบล",
    video: "https://drive.google.com/file/d/1uniMG91kgmaJfp8omHg5puteH3fu-WZV/preview",
  },
  {
    title: "Dumbbell One Arm Press",
    muscles: ["หลัง","หน้าแขน"],
    equipment: "ดัมเบล",
    video: "https://drive.google.com/file/d/1in4KYaCJ51cy-ogFG0yshgXT5SDSGZYL/view?usp=sharing",
  },
];

export default function WorkoutsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-semibold mb-4">ท่าออกกำลังกาย</h1>
      <FilterModal />
      {workouts.map((w, i) => (
  <div key={i} className="mb-10">
    <div className="max-w-2xl mx-auto my-6">
      <iframe
        src={w.video.includes("preview") 
              ? w.video 
              : w.video.replace("/view?usp=sharing", "/preview")
        }
        width="100%"
        height="360"
        allow="autoplay"
        allowFullScreen
        className="rounded-xl shadow-lg"
      />
    </div>
    <h2 className="font-semibold text-lg">{w.title}</h2>

    <div className="mt-2 text-left space-y-1">
      <div>
        <span className="font-medium block mb-1">กล้ามเนื้อ</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {w.muscles.map((m, j) => (
            <span key={j} className="text-md px-3 py-1 bg-gray-100 rounded-full">
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="py-3">
        <span className="font-medium block mb-1">อุปกรณ์ที่ใช้</span>
        <div className="inline-block px-2 py-1 bg-gray-100 rounded-full">
          🛠️ {w.equipment}
        </div>
      </div>
    </div>
  </div>
))}
  {/* Pagination */}
  <div className="flex justify-center items-center gap-1 mt-8">
        <button className="text-xs px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600">1</button>
        <button className="text-xs px-3 py-1 border rounded">2</button>
        <button className="text-xs px-3 py-1 border rounded">3</button>
        <button className="text-xs px-3 py-1 border rounded flex items-center gap-1">
          Last <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
