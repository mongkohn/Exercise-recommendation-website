"use client";
import Articlesbox from "@/components/articlesbox";
import ChatAdmin from "@/components/ChatAdmin";
import Image from "next/image";

const HERO_CONTENT = {
  title: "เปลี่ยนชีวิตด้วยการออกกำลังกาย",
  subtitle: "เสริมสร้างสุขภาพที่แข็งแรง และเป้าหมายที่คุณต้องการ",
  button: "เริ่มต้นตอนนี้",
  bgImage: "/welcome.jpeg",
};

const ABOUT_CONTENT = {
  title: "เกี่ยวกับเรา",
  description:
    "เราคือแพลตฟอร์มที่มุ่งเน้นการส่งเสริมสุขภาพด้วยวิธีที่ทันสมัย ทั้งการออกกำลังกายแบบมืออาชีพ เราเชื่อว่าการดูแลสุขภาพไม่ใช่แค่เรื่องของรูปร่าง แต่คือการสร้างคุณภาพชีวิตที่ดียิ่งขึ้นอย่างยั่งยืน ร่วมก้าวไปกับเราเพื่อสุขภาพที่แข็งแรง สดใส และชีวิตที่มีความสุขในทุก ๆ วัน",
};

const FEATURES = [
  {
    img: "/feature1.png",
    alt: "โปรแกรมเฉพาะบุคคล",
    title: "โปรแกรมเฉพาะบุคคล",
    desc: "ออกแบบแผนการซ้อมที่ตรงกับเป้าหมายส่วนตัวของคุณ",
  },
  {
    img: "/feature2.png",
    alt: "เข้าใจได้ง่าย",
    title: "เข้าใจได้ง่าย",
    desc: "มีคำอธิบายของท่าออกกำลังกายที่ชัดเจนเข้าใจได้ง่าย ",
  },
  {
    img: "/feature3.png",
    alt: "เหมาะสำหรับผู้เริ่มต้น",
    title: "เหมาะสำหรับผู้เริ่มต้น",
    desc: "ท่าทางการออกกำลังกายจะเป็นท่าเริ่มต้นที่ง่ายโฟกัสได้ง่าย และป้องกันการบาดเจ็บ",
  },
];

const COURSES = [
  {
    bg: "from-blue-400 to-blue-500",
    title: "เวทเทรนนิ่งเบื้องต้น",
    desc: "สร้างกล้ามเนื้อด้วยเทคนิคพื้นฐานอย่างมืออาชีพ",
  },
  {
    bg: "from-green-400 to-green-500",
    title: "ฟิตแอนด์เฟิร์มใน 30 วัน",
    desc: "แผนฝึกพิเศษเพื่อเห็นผลจริงใน 1 เดือน",
  },
  {
    bg: "from-purple-400 to-purple-500",
    title: "โยคะเพื่อสุขภาพ",
    desc: "เพิ่มความยืดหยุ่นและลดความเครียดในชีวิตประจำวัน",
  },
];

const TESTIMONIALS = [
  {
    img: "/user.png",
    name: "สมชาย ใจดี",
    quote:
      '"เข้าร่วมกับที่นี่แค่ 3 เดือน น้ำหนักลดไป 10 กิโล! เทรนเนอร์และโปรแกรมดีมากๆครับ!"',
  },
  {
    img: "/user.png",
    name: "พรทิพย์ รักสุขภาพ",
    quote:
      '"บรรยากาศเป็นกันเอง โปรแกรมเทรนนิ่งก็เข้าใจง่าย สนุกและได้ผลลัพธ์จริง!"',
  },
  {
    img: "/user.png",
    name: "เจนจิรา ฟิตเต็มที่",
    quote:
      '"ไม่เคยคิดเลยว่าการออกกำลังกายจะสนุกขนาดนี้! ตอนนี้ติดออกกำลังกายไปแล้วค่ะ"',
  },
  {
    img: "/user.png",
    name: "เจนจิรา ฟิตเต็มที่2",
    quote:
      '"ไม่เคยคิดเลยว่าการออกกำลังกายจะสนุกขนาดนี้! ตอนนี้ติดออกกำลังกายไปแล้วค่ะ"',
  },
  {
    img: "/user.png",
    name: "เจนจิรา ฟิตเต็มที่3",
    quote:
      '"ไม่เคยคิดเลยว่าการออกกำลังกายจะสนุกขนาดนี้! ตอนนี้ติดออกกำลังกายไปแล้วค่ะ"',
  },
  {
    img: "/user.png",
    name: "เจนจิรา ฟิตเต็มที่4",
    quote:
      '"ไม่เคยคิดเลยว่าการออกกำลังกายจะสนุกขนาดนี้! ตอนนี้ติดออกกำลังกายไปแล้วค่ะ"',
  },
];

function HeroSection() {
  return (
    <section
      className="w-full h-screen bg-cover bg-center flex flex-col justify-center items-center relative"
      style={{ backgroundImage: `url('${HERO_CONTENT.bgImage}')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"/>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          {HERO_CONTENT.title}
        </h1>
        <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
          {HERO_CONTENT.subtitle}
        </p>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition"
        >
          {HERO_CONTENT.button}
        </button>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-600 mb-8">
          {ABOUT_CONTENT.title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {ABOUT_CONTENT.description}
        </p>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
          จุดเด่นของเรา
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white shadow-md rounded-lg p-8 text-center hover:shadow-xl transition"
            >
              <Image
                src={f.img}
                alt={f.alt}
                width={64}
                height={64}
                className="w-16 h-16 mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2 text-blue-500">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
          คอร์สยอดนิยม
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COURSES.map((c) => (
            <div
              key={c.title}
              className={`bg-gradient-to-r ${c.bg} text-white p-8 rounded-lg hover:scale-105 transition`}
            >
              <h3 className="text-2xl font-semibold mb-2">{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
          MEMBERS&apos; TESTIMONIALS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-gray-100 p-8 rounded-xl shadow-md hover:shadow-lg transition"
            >
                <Image
                  src={t.img}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-blue-500 mb-2">
                  {t.name}
                </h3>
                <p className="text-gray-600 text-center">{t.quote}</p>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticlesSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
          บทความล่าสุด
        </h2>
        <Articlesbox />
      </div>
    </section>
  );
}
function CallToActionSection() {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          {CTA_CONTENT.title}
        </h2>
        <p className="mb-8 text-lg">
          {CTA_CONTENT.description}
        </p>
        <button
          type="button"
          className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition"
        >
          {CTA_CONTENT.button}
        </button>
      </div>
    </section>
  );
}

const CTA_CONTENT = {
  title: "พร้อมเปลี่ยนชีวิตแล้วหรือยัง?",
  description: "เข้าร่วมกับเราวันนี้เพื่อประสบการณ์ใหม่ที่ดีกว่า!",
  button: "สมัครสมาชิกฟรี",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ChatAdmin/>
      <AboutSection />
      <FeaturesSection />
      {/* <CoursesSection /> */}
      <TestimonialsSection />
      <ArticlesSection />
      {/* <CallToActionSection /> */}
    </>
  );
}
