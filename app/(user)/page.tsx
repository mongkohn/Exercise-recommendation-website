"use client";
import Articlesbox from "@/components/articlesbox";
import ChatAdmin from "@/components/ChatAdmin";
import { ChevronRight, Play, Star, Users, Trophy, Heart, ArrowRight, Dumbbell, Target, BookOpen } from "lucide-react";
import Image from "next/image";

const HERO_CONTENT = {
  title: "เปลี่ยนชีวิตด้วยการออกกำลังกาย",
  subtitle: "เสริมสร้างสุขภาพที่แข็งแรง และเป้าหมายที่คุณต้องการ",
  button: "เริ่มต้นตอนนี้",
  link: "/bmi",
  bgImage: "/welcome.png",
};

const ABOUT_CONTENT = {
  title: "เกี่ยวกับเรา",
  description:
    "เราคือแพลตฟอร์มที่มุ่งเน้นการส่งเสริมสุขภาพด้วยวิธีที่ทันสมัย ทั้งการออกกำลังกายแบบมืออาชีพ เราเชื่อว่าการดูแลสุขภาพไม่ใช่แค่เรื่องของรูปร่าง แต่คือการสร้างคุณภาพชีวิตที่ดียิ่งขึ้นอย่างยั่งยืน ร่วมก้าวไปกับเราเพื่อสุขภาพที่แข็งแรง สดใส และชีวิตที่มีความสุขในทุก ๆ วัน",
};

const FEATURES = [
  {
    img: "/User-Single-Neutral-Male--Streamline-Core.png",
    alt: "โปรแกรมเฉพาะบุคคล",
    title: "โปรแกรมเฉพาะบุคคล",
    desc: "ออกแบบแผนการซ้อมที่ตรงกับเป้าหมายส่วนตัวของคุณ",
  },
  {
    img: "/Lightbulb--Streamline-Core.png",
    alt: "เข้าใจได้ง่าย",
    title: "เข้าใจได้ง่าย",
    desc: "มีคำอธิบายของท่าออกกำลังกายที่ชัดเจนเข้าใจได้ง่าย ",
  },
  {
    img: "/Book-Reading--Streamline-Core.png",
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
    img: "/User-Circle-Single--Streamline-Core.png",
    name: "สมชาย ใจดี",
    quote:
      '"เข้าร่วมกับที่นี่แค่ 3 เดือน น้ำหนักลดไป 10 กิโล! เทรนเนอร์และโปรแกรมดีมากๆครับ!"',
  },
  {
    img: "/User-Circle-Single--Streamline-Core.png",
    name: "พรทิพย์ รักสุขภาพ",
    quote:
      '"บรรยากาศเป็นกันเอง โปรแกรมเทรนนิ่งก็เข้าใจง่าย สนุกและได้ผลลัพธ์จริง!"',
  },
  {
    img: "/User-Circle-Single--Streamline-Core.png",
    name: "เจนจิรา ฟิตเต็มที่",
    quote:
      '"ไม่เคยคิดเลยว่าการออกกำลังกายจะสนุกขนาดนี้! ตอนนี้ติดออกกำลังกายไปแล้วค่ะ"',
  },
  {
    img: "/User-Circle-Single--Streamline-Core.png",
    name: "เจนจิรา ฟิตเต็มที่",
    quote:
      '"ไม่เคยคิดเลยว่าการออกกำลังกายจะสนุกขนาดนี้! ตอนนี้ติดออกกำลังกายไปแล้วค่ะ"',
  },
  {
    img: "/User-Circle-Single--Streamline-Core.png",
    name: "เจนจิรา ฟิตเต็มที่",
    quote:
      '"ไม่เคยคิดเลยว่าการออกกำลังกายจะสนุกขนาดนี้! ตอนนี้ติดออกกำลังกายไปแล้วค่ะ"',
  },
  {
    img: "/User-Circle-Single--Streamline-Core.png",
    name: "เจนจิรา ฟิตเต็มที่",
    quote:
      '"ไม่เคยคิดเลยว่าการออกกำลังกายจะสนุกขนาดนี้! ตอนนี้ติดออกกำลังกายไปแล้วค่ะ"',
  },
];

function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_CONTENT.bgImage}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/70 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8 text-white/90 animate-fade-in">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">#1 แพลตฟอร์มออกกำลังกายออนไลน์</span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight animate-slide-up">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              เปลี่ยนชีวิต
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ด้วยการออกกำลังกาย
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            เสริมสร้างสุขภาพที่แข็งแรง พร้อมบรรลุเป้าหมายที่คุณต้องการ 
            ด้วยโปรแกรมที่ออกแบบเฉพาะสำหรับคุณ
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay">
            <a href={HERO_CONTENT.link}>
              <button type="button" className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-blue-500/30 flex items-center gap-2">
                {HERO_CONTENT.button}
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </a>
            <button type="button" className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 border border-white/30 flex items-center gap-2">
              <Play className="w-5 h-5" />
              ดูวิดีโอแนะนำ
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up">
            {[
              { number: "10K+", label: "สมาชิกที่พอใจ" },
              { number: "500+", label: "ท่าออกกำลังกาย" },
              { number: "95%", label: "อัตราความสำเร็จ" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              เกี่ยวกับเรา
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              สร้างสรรค์
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> ชีวิตใหม่ </span>
              ที่แข็งแรง
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {ABOUT_CONTENT.description}
            </p>

            {/* Features list */}
            <div className="space-y-4">
              {[
                "โปรแกรมออกแบบเฉพาะบุคคล",
                "คำแนะนำจากผู้เชี่ยวชาญ",
                "ติดตามผลลัพธ์แบบเรียลไทม์"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual element */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="aspect-square bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Users className="w-24 h-24 text-white" />
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500 rounded-full opacity-20 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            จุดเด่นที่ทำให้เรา
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> พิเศษ</span>
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            ความแตกต่างที่จะช่วยให้คุณบรรลุเป้าหมายได้อย่างมีประสิทธิภาพ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <Image 
                    src={feature.img} 
                    alt={feature.alt} 
                    width={40} 
                    height={40} 
                    className="w-10 h-10 filter brightness-0 invert"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-xl scale-150 group-hover:opacity-40 transition-opacity" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-blue-200 text-center leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            เสียงจาก
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> สมาชิก </span>
            ของเรา
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            ความสำเร็จที่เกิดขึ้นจริงจากผู้ที่เชื่อใจและเดินทางไปกับเรา
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="group bg-white/80 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-slate-700 mb-6 italic leading-relaxed">
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={testimonial.img}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                  <p className="text-slate-500 text-sm">สมาชิกพรีเมี่ยม</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticlesSection() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            ความรู้สุขภาพ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            บทความ
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> ล่าสุด</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            อัปเดตความรู้ใหม่ๆ เกี่ยวกับสุขภาพ การออกกำลังกาย และโภชนาการ
          </p>
        </div>
        <Articlesbox />
        
        {/* View all button */}
        <div className="text-center mt-12">
          <a href="/articles">
            <button className="group bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto">
              ดูบทความทั้งหมด
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ChatAdmin />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ArticlesSection />
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 1s ease-out 0.5s both;
        }
        
        .animate-fade-in-up {
          animation: slide-up 1s ease-out 0.7s both;
        }
      `}</style>
    </>
  );
}
