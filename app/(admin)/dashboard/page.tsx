"use client";

import { useState } from "react";
import Image from "next/image"; // ต้องใช้ import สำหรับ Image หากใช้ next/image

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Sidebar onSelect={setActiveMenu} />
      <main className="flex-1 flex flex-col">
        <Header />
        <Content activeMenu={activeMenu} />
      </main>
    </div>
  );
}

function Sidebar({ onSelect }: { onSelect: (menu: string) => void }) {
  return (
    <aside className="w-72 bg-white border-r flex flex-col justify-between shadow-md">
      <div>
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

        <nav className="px-6 py-6 space-y-2">
          <SidebarItem icon="🏋️‍♀️" label="จัดการท่าออกกำลังกาย" onClick={() => onSelect("exercise")} />
          <SidebarItem icon="📆" label="จัดการโปรแกรม" onClick={() => onSelect("program")} />
          <SidebarItem icon="📰" label="จัดการบทความ" onClick={() => onSelect("articles")} />
          <SidebarItem icon="👥" label="จัดการบัญชีผู้ใช้" onClick={() => onSelect("users")} />
        </nav>
      </div>

      <div className="px-6 py-4 border-t">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-all font-semibold">
          🚪 <span>ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
}

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
type Exercise = {
  name: string;
  image: string;
  description: string;
};

function Content({ activeMenu }: { activeMenu: string }) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  if (activeMenu === "exercise") {
    if (selectedExercise) {
      return (
        <section className="p-8 max-w-6xl mx-auto">
          <div className="w-full flex justify-start mb-4">
        <button
          onClick={() => setSelectedExercise(null)}
          className="text-blue-600 hover:underline"
          >
          ← ย้อนกลับ
        </button>
        </div>

          <h1 className="text-3xl font-bold mb-8">{selectedExercise.name}</h1>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-2/3 w-full aspect-video">
              <iframe
                className="w-full h-full rounded-lg shadow"
                src="https://drive.google.com/file/d/1uniMG91kgmaJfp8omHg5puteH3fu-WZV/preview"
                title={selectedExercise.name}
                allowFullScreen
              />
            </div>

            <div className="flex-1 border p-6 rounded-lg shadow bg-white">
              <h2 className="text-xl font-semibold mb-4">อธิบายท่าออกกำลังกาย</h2>
              <div className="text-gray-700 p-3 space-y-2">
                <p>1. โน้มตัวไปข้างหน้า 45 องศา</p>
                <p>2. ให้จับบาร์กว้างกว่าไหล่</p>
                <p>3. ดึงข้อศอกไปด้านหลัง เกร็งหลัง</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">อุปกรณ์ที่ใช้</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">🛠️ บาร์เบล</span>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">กล้ามเนื้อ</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">💪 หลัง</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">💪 แขน</span>
            </div>
          </div>
        </section>
      );
    }

    // กรณียังไม่ได้เลือก
    return (
      <section className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">จัดการท่าออกกำลังกาย</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exerciseList.map((exercise, index) => (
            <button
              key={index}
              onClick={() => setSelectedExercise(exercise)}
              className="bg-white shadow rounded-xl overflow-hidden text-left"
            >
              <img
                src={exercise.image}
                alt={exercise.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{exercise.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{exercise.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  if (activeMenu === "program") {
    return (
      <section className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">จัดการโปรแกรม</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
              ➕ เพิ่มโปรแกรม
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
              🗑️ ลบโปรแกรม
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {programList.map((program, index) => (
            <div key={index} className="bg-white shadow rounded-xl overflow-hidden">
              <img
                src={program.image}
                alt={program.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {program.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (activeMenu === "articles") {
    return (
      <section className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">จัดการบทความ</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
              ➕ เพิ่มบทความ
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
              🗑️ ลบบทความ
            </button>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden hover:scale-105 transition"
            >
              <div className="relative h-56 w-full">
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{article.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{article.description}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  อ่านต่อ...
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (activeMenu === "users") {
    return (
      <section className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">จัดการบัญชีผู้ใช้</h2>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-gray-700 font-semibold">ชื่อผู้ใช้</th>
                <th className="px-6 py-3 text-gray-700 font-semibold">อีเมล</th>
                <th className="px-6 py-3 text-gray-700 font-semibold">สถานะ</th>
                <th className="px-6 py-3 text-gray-700 font-semibold">การกระทำ</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-700">{user.username}</td>
                  <td className="px-6 py-3 text-gray-700">{user.email}</td>
                  <td className="px-6 py-3 text-gray-700">
                    {user.status === "active" ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-red-600">Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                      ✏️ แก้ไข
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition ml-2">
                      🗑️ ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

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

const exerciseList = [
  {
    name: "Bent Over Rows",
    image: "img-workout-1.png",
    description:
      "ท่านี้จะเป็นการออกแรงในส่วนของกล้ามเนื้อ หลังส่วนล่าง (Lower Back) และ หลังส่วนกลาง (Middle Back)",
  },
  {
    name: "Dumbbell One Arm Press",
    image: "img-workout-2.png",
    description:
      "ช่วยเสริมสร้างความแข็งแรงให้กับกล้ามเนื้อหลังส่วนบน โดยเฉพาะกล้ามเนื้อ latissimus dorsi และ rhomboids",
  },
];

const programList = [
  {
    name: "Bodyweight Strength For Runners",
    image: "https://www.hss.edu/images/socialmedia/running-knee-1200x630.jpg",
    description:
      "โปรแกรมฝึกด้วยน้ำหนักตัวที่เหมาะสำหรับนักวิ่ง เพิ่มความแข็งแรงในส่วนต่าง ๆ ของร่างกาย",
  },
];

const articles = [
  {
    title: "วิ่งอย่างไร ไม่ให้เจ็บ",
    description: "วิ่งอย่างไร ไม่ให้เจ็บ การเลือกรองเท้าวิ่งก็เป็นสิ่งสำคัญ เริ่มจากการเดินเร็วหรือวิ่งเหยาะๆ ไม่ควรวิ่งแบบก้าวเท้ายาว ไม่ควรวิ่งขึ้น-ลงเนิน",
    image: "https://multimedia.anamai.moph.go.th/oawoocha/2023/12/info620_run_4_1-1024x1018.jpg",
    link: "https://multimedia.anamai.moph.go.th/infographics/info620_run_4/"
  },
  {
    title: "การออกกำลังกายเพื่อสุขภาพ",
    description: "บทความโดย ศาสตราจารย์แพทย์หญิงชุติมา ศิริกุลชยานนท์ ภาควิชาโภชนวิทยา คณะสาธารณสุขศาสตร์ มหาวิทยาลัยมหิดล",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Seal_of_the_Department_of_Health.svg",
    link: "https://hpc11.anamai.moph.go.th/th/sa-suk-11/200024#"
  },
  {
    title: "SAVE YOUR HEALTH",
    description: "“Fitness” หรือสถานประกอบกิจการเพื่อสุขภาพ ในปัจจุบันมีผู้ใช้บริการเป็นจำนวนมาก โดยเฉพาะคนวัยทำงาน เพราะการมีสุขภาพที่ดี คือ การออกกำลังกายอย่างน้อย สัปดาห์ละ 3 วันๆ ละ 30 นาที",
    image: "https://files.gqthailand.com/uploads/running.jpg",
    link: "https://multimedia.anamai.moph.go.th/help-knowledgs/save-your-health/"
  },
  {
    title: "ผักผลไม้ที่ช่วยทดแทนน้ำในร่างกาย และทำให้ร่างกายสดชื่น",
    description: "ช่วยทดแทนน้ำในร่างกายที่สูญเสียไปเรื่องจากอากาศร้อนได้ แถมยังมีสารต้านอนุมูลอิสระที่เกิดขึ้นตามธรรมชาติ ช่วยลดการอักเสบจากการเผาไหม้ของแสงแดดในหน้าร้อน",
    image: "https://multimedia.anamai.moph.go.th/oawoocha/2024/05/heath_me_43_fruit_1_0-768x768.jpg",
    link: "https://multimedia.anamai.moph.go.th/help-knowledgs/heath_me_43_fruit_1/"
  },
  {
    title: "อาหารทะเลช่วงหน้าร้อนต้องระวังและเลือกเป็นพิเศษ",
    description: "การกินอาหารทะเลช่วงหน้าร้อนต้องระวังและเลือกเป็นพิเศษ เพราะ ในช่วงหน้าร้อน อาหารทะเลจะเน่าเสียง่าย อาจทำให้ร้านค้าบางรายใช้วิธีการไม่ถูกต้อง",
    image: "https://multimedia.anamai.moph.go.th/oawoocha/2024/05/heath_me_42_seafood_1-768x768.jpg",
    link: "https://multimedia.anamai.moph.go.th/help-knowledgs/heath_me_42_seafood_1/"
  },
  {
    title: "ทุกวัย นอน ดี สุขภาพดี",
    description: "จากความเดิมคราวที่แล้ว ในเรื่อง “ต่างวัย (นอน) แตกต่าง” วัยแรกเกิด จนถึงอายุ 2 ปี มาคราวนี้ กรมอนามัย ขอแนะนำต่อ กับ ระยะการนอนหลับแต่ละช่วงวัย ตาม National Sleep Foundation ในช่วง “วัยเรียนวัยุร่น”",
    image: "https://multimedia.anamai.moph.go.th/oawoocha/2024/04/heath_me_34_sleep_2-768x767.jpg",
    link: "https://multimedia.anamai.moph.go.th/help-knowledgs/heath_me_34_sleep_2/"
  },
];

const userList = [
  { username: "Mod", email: "mongkohn.kubpom@gmail.com", status: "active" },
  { username: "Nack", email: "okm6344@gmail.com", status: "inactive" },
];