// HomePage.tsx
export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <Content />
      </main>
    </div>
  );
}

// Sidebar Component
function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r flex flex-col justify-between shadow-md">
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center h-24 border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
          <div className="text-center">
            {/* Icon + Text */}
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
          <SidebarItem icon="🏋️‍♀️" label="จัดการท่าออกกำลังกาย" />
          <SidebarItem icon="📆" label="จัดการโปรแกรม" />
          <SidebarItem icon="📰" label="จัดการบทความ" />
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
function SidebarItem({ icon, label }: { icon: string; label: string }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-100 text-gray-700 hover:text-blue-700 transition-all font-medium"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

// Header Component
function Header() {
  return (
    <header className="h-16 bg-white border-b shadow flex items-center justify-between px-6">
      <div className="text-xl font-semibold text-gray-800">แดชบอร์ด</div>
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-inner">
        <span className="text-base">👤</span>
        <span>ผู้ดูแลระบบ</span>
      </div>
    </header>
  );
}

// Content Section
function Content() {
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
