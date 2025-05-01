import { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function ChatAdmin() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* ปุ่มกลม */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* กล่องแชท */}
      {open && (
        <div className="mt-4 bg-white border rounded-xl shadow-xl w-80 max-h-[700px] flex flex-col overflow-hidden">
          <div className="bg-blue-500 text-white px-4 py-2 font-bold text-sm">
            แชทกับแอดมิน
          </div>
          <div className="p-4 text-sm text-gray-700 flex-1 overflow-y-auto space-y-3">
            {/* ข้อความจากแอดมิน */}
            <div className="flex items-start space-x-2">
              <img
                src="/logo.jpeg" // เพิ่มภาพใน public folder
                alt="admin"
                className="w-8 h-8 rounded-full"
              />
              <div className="bg-gray-100 px-3 py-2 rounded-xl rounded-tl-none shadow">
                👋 สวัสดีค่ะ มีอะไรให้ช่วยมั้ยครับ?
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <img
                src="/logo.jpeg"
                alt="admin"
                className="w-8 h-8 rounded-full"
              />
              <div className="bg-gray-100 px-3 py-2 mb-40 rounded-xl rounded-tl-none shadow">
                📌 หากต้องการสอบถามรายละเอียดเพิ่มเติม พิมพ์ข้อความด้านล่างได้เลยครับ
              </div>
            </div>
          </div>

          <div className="px-4 pb-2 flex flex-wrap justify-end gap-2">
            <p className="text-gray-500">คำถาม?</p>
          </div>
        {/* ปุ่มข้อความแนะนำ (Quick replies) */}
<div className="px-4 pb-2 flex flex-wrap justify-end gap-2">
  <button className="bg-blue-400 text-white rounded-lg hover:bg-blue-500 px-3 py-1 text-sm">
    ประโยชน์ของการออกกำลังกาย
  </button>
  <button className="bg-blue-400 text-white rounded-lg hover:bg-blue-500 px-3 py-1 text-sm">
    เริ่มต้นการออกกำลังกายอย่างไร
  </button>
  <button className="bg-blue-400 text-white rounded-lg hover:bg-blue-500 px-3 py-1 text-sm">
    ระหว่างคาร์ดิโอกับเวทเทรนนิ่งควรเริ่มต้นอันไหนก่อนดี
  </button>
</div>

          {/* ช่องพิมพ์ข้อความ */}
          <div className="border-t px-4 py-2  flex">
            <input
              type="text"
              placeholder="พิมพ์ข้อความ..."
              className="w-full text-sm px-3 py-2 border rounded focus:border-blue-400 focus:outline-none bg-white"
            />
            <button className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-2 px-4">
              ส่ง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
