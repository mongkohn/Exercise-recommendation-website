import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const workoutPrograms = [
  {
    title: "Bodyweight Strength For Runners",
    duration: "20 นาที",
    difficulty: "ปานกลาง",
    category: "Strength For Runners",
    image: "https://www.hss.edu/images/socialmedia/running-knee-1200x630.jpg",
    link :"/programs/program_1", 
    levelIcons: "🔵🔵⚪️", 
  },
];

export default function Programs() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-center text-gray-800 text-3xl font-semibold mb-10 p-7 ">โปรแกรมออกกำลังกาย</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {workoutPrograms.map((program, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 mb-10 "
          >
            <Link href={program.link}>
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-48 object-cover"
            />
            </Link>

            <div className="p-4 space-y-2">
              <h2 className="font-semibold text-lg">{program.title}</h2>

              <div className="flex items-center text-sm text-gray-600 gap-2">
                <Clock className="w-4 h-4" />
                {program.duration}
              </div>

              <div className="flex justify-between text-sm mt-2">
                <div>
                  <div className="text-gray-500">ความยาก</div>
                  <div className="text-lg">{program.levelIcons}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500">หมวดหมู่</div>
                  <Badge className="mt-1 bg-blue-100 text-blue-800">
                    {program.category}
                  </Badge>
                
                
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
