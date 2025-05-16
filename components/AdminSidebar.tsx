"use client";

type AdminSidebarProps = {
  onSelect: (menu: string) => void;
};

export default function AdminSidebar({ onSelect }: AdminSidebarProps) {
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
        <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-all font-semibold">
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
      type="button"
      onClick={onClick}
      className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-100 text-gray-700 hover:text-blue-700 transition-all font-medium"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
