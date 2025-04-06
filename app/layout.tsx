
import './globals.css';
import { Prompt } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import Link from 'next/link';
import { ChevronDown, User2 } from "lucide-react";

const prompt = Prompt({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
  
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={prompt.className } bg-white min-h-screen>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}
          <header className="bg-white shadow-md rounded-xl">
            <div className="container mx-auto flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="">
                <img src="logo.jpeg" alt="logo" height={90} width={90} />
              </Link>

              {/* Menu */}
              <nav className="flex gap-6 items-center text-blue-900 font-medium">
                <div className="relative group">
                  <button className="flex items-center gap-1 hover:text-blue-400">
                    การเผาผลาญต่อวัน
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {/* Dropdown */}
                  <div className="absolute top-full left-0 z-10 mt-2 w-48 bg-white border rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/bmr" className="block px-4 py-2 hover:bg-blue-50">
                      คำนวณ BMR
                    </Link>
                    <Link href="/bmi" className="block px-4 py-2 hover:bg-blue-50">
                      คำนวณ BMI
                    </Link>
                  </div>
                </div>
                <Link href="/workouts" className="hover:text-blue-400" >ท่าการออกกำลังกาย</Link>
                <Link href="/programs" className="hover:text-blue-400">โปรแกรมออกกำลังกาย</Link>
                <Link href="/contact"  className="hover:text-blue-400">ช่องทางติดต่อ</Link>
                <Link href="/articles" className="hover:text-blue-400">บทความ</Link>
                <Link href="/history"  className="hover:text-blue-400">ประวัติ</Link>
              </nav>

              {/* User Icon */}
              <Link href="#">
                <User2 className="w-6 h-6 text-black hover:text-blue-400  "  />
              </Link>
            </div>
          </header>

          {/* Page content */}
          {children}
        </ThemeProvider>
      </body>
      <footer
  className= {prompt.className }
  bg-cover  bg-no-repeat text-white mt-12
  style={{ backgroundImage: "url('/gym.jpg')" }}
>
  {/* เลเยอร์โปร่งใสคลุมพื้นหลัง */}
  <div className= "bg-white/20 backdrop-blur-sm  ">
    <div className="   max-w-7xl  mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white ">
      
      {/* คอลัมน์ 1 */}
      <div>
        <h2 className="text-2xl font-bold mb-2">ติดตาม ERD ได้ที่</h2>
        <a href="https://line.me" target="_blank" rel="noopener noreferrer">
          <img src="/Line.png" alt="Line" className="w-10 h-10" />
        </a>
      </div>

      {/* คอลัมน์ 2 */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-1 text-sm text-white">
          <li><a href="/bmr" className="hover:underline hover:text-blue-500">เช็คการเผาผลาญพลังงาน BMR</a></li>
          <li><a href="/bmi" className="hover:underline hover:text-blue-500">เช็คดัชนีมวลกาย BMI</a></li>
          <li><a href="/articles" className="hover:underline hover:text-blue-500">บทความ</a></li>
          <li><a href="/programs" className="hover:underline hover:text-blue-500">โปรแกรมออกกำลังกาย</a></li>
        </ul>
      </div>

      {/* คอลัมน์ 3 */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">Contact Us</h3>
        <ul className="text-sm space-y-1">
          <h2 >ERD Space Online</h2>
          <li><a href="mailto:mongkohn.kubpom@gmail.com" className="text-blue-300 hover:underline hover:text-blue-500">mongkohn.kubpom@gmail.com</a></li>
          <li><a href="mailto:mongkohn.kubpom@gmail.com" className="text-blue-300 hover:underline hover:text-blue-500">okm6344@gmail.com</a></li>
        </ul>
        <ul>
        <h2 className='mt-4'>PHONE</h2>
          <li><a href="tel:0926241304" className="text-sm text-blue-300 hover:underline hover:text-blue-500">092-624-1304</a></li>
          <li><a href="tel:0926241304" className="text-sm text-blue-300 hover:underline hover:text-blue-500">092-751-1329</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    </html>
  );
}
