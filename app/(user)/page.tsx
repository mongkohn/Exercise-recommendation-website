"use client";
import Articlesbox from "@/components/articlesbox";
import ChatAdmin from "@/components/ChatAdmin";
import { ChevronRight, Play, Star, Users, Trophy, Heart, ArrowRight, Dumbbell, Target, BookOpen, RefreshCw, Loader2, Clock } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

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
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up">
            {[
              { number: "10K+", label: "สมาชิกที่พอใจ" },
              { number: "500+", label: "ท่าออกกำลังกาย" },
              { number: "99%", label: "อัตราความสำเร็จ" }
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

interface Article {
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
  link?: string;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  date?: string;
}

function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchLatestArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different API response structures
      let articlesData = [];
      if (Array.isArray(data)) {
        articlesData = data;
      } else if (data.data && Array.isArray(data.data)) {
        articlesData = data.data;
      } else if (data.articles && Array.isArray(data.articles)) {
        articlesData = data.articles;
      }

      // Sort by creation date (most recent first) and take only first 3
      const sortedArticles = articlesData
        .sort((a: any, b: any) => {
          const getDate = (article: { [x: string]: string | number | Date; }) => {
            const dateFields = ['createdAt', 'created_at', 'updatedAt', 'updated_at', 'date', '_id'];
            for (const field of dateFields) {
              if (article[field]) {
                if (field === '_id' && typeof article[field] === 'string' && (article[field] as string).length === 24) {
                  return new Date(parseInt((article[field] as string).substring(0, 8), 16) * 1000);
                }
                return new Date(article[field]);
              }
            }
            return new Date(0);
          };
          
          const dateA = getDate(a);
          const dateB = getDate(b);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 3); // Show only latest 3 articles

      setArticles(sortedArticles);
      setError(false);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch latest articles:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestArticles();
    
    // Auto-refresh every 10 minutes
    const interval = setInterval(fetchLatestArticles, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
            อัปเดตความรู้ใหม่ๆ เกี่ยวกับสุขภาพ การออกกำลังกาย และโภชนาการ
          </p>
          
          {/* Last updated info */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={fetchLatestArticles}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-all duration-300 font-medium disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'กำลังอัพเดท...' : 'รีเฟรช'}
            </button>
            
            {lastUpdated && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                <span>อัพเดทล่าสุด: {lastUpdated.toLocaleTimeString('th-TH')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Articles Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
              <p className="text-slate-600 font-medium">กำลังโหลดบทความล่าสุด...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-800 mb-2">ไม่สามารถโหลดบทความได้</h3>
              <p className="text-red-600 mb-4">กรุณาลองใหม่อีกครั้ง</p>
              <button
                onClick={fetchLatestArticles}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium"
              >
                ลองใหม่
              </button>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">ยังไม่มีบทความ</h3>
              <p className="text-slate-600">กรุณารอสักครู่ เราจะอัพเดทบทความใหม่เร็วๆ นี้</p>
            </div>
          </div>
        ) : (
          <>

            {/* Custom Articles Display - Fixed size cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {articles.map((article, index) => (
                <div key={article._id || index} className="group relative">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-slate-100 h-full flex flex-col">
                    {/* Article Image - Increased height */}
                    <div className="relative h-56 bg-gradient-to-br from-green-100 to-blue-100 flex-shrink-0">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title || 'Article'}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <BookOpen className="w-12 h-12 text-slate-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Article Content - Increased padding */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-bold text-xl mb-4 text-slate-800 line-clamp-2 group-hover:text-green-600 transition-colors min-h-[3.5rem]">
                        {article.title || 'ไม่มีชื่อบทความ'}
                      </h3>
                      
                      <p className="text-slate-600 text-sm mb-5 line-clamp-3 flex-grow min-h-[5rem]">
                        {article.description || 'ไม่มีคำอธิบาย'}
                      </p>
                      
                      {/* Article date */}
                      {(article.createdAt || article.created_at) && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(article.createdAt || article.created_at!).toLocaleDateString('th-TH', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                      
                      {/* Read more link - Always at bottom */}
                      <div className="mt-auto">
                        {article.link && (
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-green-600 text-base font-medium hover:text-green-800 transition-colors group/link"
                          >
                            อ่านต่อ...
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {/* View all button */}
        <div className="text-center">
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
