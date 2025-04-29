"use client";

import { useState } from "react";
import { ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import FilterModal from "@/components/FilterModal";
import Image from "next/image";

type Page = "home" | "workouts" | "programs" | "articles";

export default function HomePage() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Sidebar onSelect={setPage} />
      <main className="flex-1 flex flex-col">
        <Header />
        <Content page={page} />
      </main>
    </div>
  );
}

// Sidebar Component
function Sidebar({ onSelect }: { onSelect: (page: Page) => void }) {
  return (
    <aside className="w-72 bg-white border-r flex flex-col justify-between shadow-md">
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center h-24 border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="text-3xl">💪</div>
              <h1 className="text-3xl font-extrabold tracking-wider">ERD</h1>
            </div>
            <p className="text-sm font-medium tracking-wide text-blue-100">
              Website Dashboard
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="px-6 py-6 space-y-2">
          <SidebarItem icon="🏋️‍♀️" label="จัดการท่าออกกำลังกาย" onClick={() => onSelect("workouts")} />
          <SidebarItem icon="📆" label="จัดการโปรแกรม" onClick={() => onSelect("programs")} />
          <SidebarItem icon="📰" label="จัดการบทความ" onClick={() => onSelect("articles")} />
        </nav>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-all font-semibold">
          🚪 <span>ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
}

// SidebarItem Component
function SidebarItem({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-100 text-gray-700 hover:text-blue-700 transition-all font-medium"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// Header Component
function Header() {
  return (
    <header className="h-16 bg-white border-b shadow flex items-center justify-between px-6">
      <div className="text-xl font-semibold text-gray-800">Home</div>
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-inner">
        <span className="text-base">👤</span>
        <span>ผู้ดูแลระบบ</span>
      </div>
    </header>
  );
}

// Content Component
function Content({ page }: { page: Page }) {
  switch (page) {
    case "workouts":
      return <WorkoutContent />;
    case "programs":
      return <Programs />;
    case "articles":
      return <ArticlesPage />;
    default:
      return (
        <section className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ระบบจัดการเว็บไซต์ ERD
          </h2>
          <p className="text-gray-600">
            ใช้เมนูด้านซ้ายเพื่ออัพเดทข้อมูลต่าง ๆ บนเว็บไซต์
          </p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-700">
            <li>ท่าการออกกำลังกาย: เพิ่ม / ลบ / แก้ไข ข้อมูล</li>
            <li>โปรแกรมออกกำลังกาย: ปรับปรุงและจัดตาราง</li>
            <li>บทความสุขภาพ: เพิ่มเนื้อหาใหม่หรือแก้ไข</li>
          </ul>
        </section>
      );
  }
}

// ArticlesPage Component
function ArticlesPage() {
  const articles = [
    {
      title: "วิ่งอย่างไร ไม่ให้เจ็บ",
      description: "วิ่งอย่างไร ไม่ให้เจ็บ การเลือกรองเท้าวิ่งก็เป็นสิ่งสำคัญ เริ่มจากการเดินเร็วหรือวิ่งเหยาะๆ ไม่ควรวิ่งแบบก้าวเท้ายาว ไม่ควรวิ่งขึ้น-ลงเนิน",
      image: "https://multimedia.anamai.moph.go.th/oawoocha/2023/12/info620_run_4_1-1024x1018.jpg",
      link : "https://multimedia.anamai.moph.go.th/infographics/info620_run_4/"
    },
    {
      title: "การออกกำลังกายเพื่อสุขภาพ",
      description: "บทความโดย ศาสตราจารย์แพทย์หญิงชุติมา ศิริกุลชยานนท์ ภาควิชาโภชนวิทยา คณะสาธารณสุขศาสตร์ มหาวิทยาลัยมหิดล",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Seal_of_the_Department_of_Health.svg",
      link : "https://hpc11.anamai.moph.go.th/th/sa-suk-11/200024#"
    },
    {
      title: "SAVE YOUR HEALTH",
      description: "“Fitness”  หรือสถานประกอบกิจการเพื่อสุขภาพ ในปัจจุบันมีผู้ใช้บริการเป็นจำนวนมาก  โดยเฉพาะคนวัยทำงาน  เพราะการมีสุขภาพที่ดี คือ การออกกำลังกายอย่างน้อย สัปดาห์ละ 3 วันๆ ละ 30 นาที",
      image: "https://files.gqthailand.com/uploads/running.jpg",
      link : "https://multimedia.anamai.moph.go.th/help-knowledgs/save-your-health/"
    },
  ];

  const handleAddArticle = () => {
    alert("ฟังก์ชันเพิ่มบทความกำลังอยู่ระหว่างพัฒนา");
  };

  const handleDeleteArticle = (index: number) => {
    alert(`ลบบทความที่ ${index + 1}`);
  };

  const handleEditArticle = (index: number) => {
    alert(`แก้ไขบทความที่ ${index + 1}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">แนะนำ</h2>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">บทความทั้งหมด</h2>
        <button
          onClick={handleAddArticle}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + เพิ่มบทความ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {articles.map((article, idx) => (
          <div key={idx} className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-56 w-full">
              <Link href={article.link}>
                <Image
                  src={article.image}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                />
              </Link>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{article.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{article.description}</p>
              <Link href={article.link} className="text-blue-600 text-sm hover:underline">อ่านต่อ...</Link>
            </div>
            <div className="flex justify-between items-center p-4">
              <button
                onClick={() => handleEditArticle(idx)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleDeleteArticle(idx)}
                className="text-red-500 hover:text-red-600"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Workout Content
function WorkoutContent() {
  const workouts = [
    {
      title: "Bent Over Rows",
      muscles: ["หลัง", "หน้าแขน"],
      equipment: "บาร์เบล",
      image: "img-workout-1.png",
      link: "/workouts/Bent-Over-Rows",
    },
    {
      title: "Dumbbell One Arm Press",
      muscles: ["หลัง", "หน้าแขน"],
      equipment: "ดัมเบล",
      image: "img-workout-2.png",
      link: "/workouts/Dumbbell-One-Arm-Press",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">
        ท่าออกกำลังกาย
      </h1>
      <FilterModal />
      {workouts.map((w, i) => (
        <div key={i} className="mb-10">
          <div className="max-w-2xl mx-auto my-6">
            <Link href={w.link}>
              <img src={w.image} className="rounded-xl shadow-lg" />
            </Link>
          </div>
          <h2 className="font-semibold text-lg">{w.title}</h2>

          <div className="mt-2 text-left space-y-1">
            <div>
              <span className="font-medium block mb-1">กล้ามเนื้อ</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {w.muscles.map((m, j) => (
                  <span
                    key={j}
                    className="text-md px-3 py-1 bg-gray-100 rounded-full"
                  >
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
        <button className="text-xs px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600">
          1
        </button>
        <button className="text-xs px-3 py-1 border rounded">2</button>
        <button className="text-xs px-3 py-1 border rounded">3</button>
        <button className="text-xs px-3 py-1 border rounded flex items-center gap-1">
          Last <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
