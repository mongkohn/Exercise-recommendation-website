'use client';
import { useState } from "react";

export default function EditProfileModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="text-center">

      <button
        className="bg-blue-500 text-sm text-white px-4 py-1 rounded hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        แก้ไข
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 shadow-lg relative">
            <h2 className="text-lg font-semibold border-b border-gray-400 pb-2 mb-4">แก้ไขข้อมูล</h2>

            <div className="space-y-3 text-left">
              <div>
                <label className="block font-medium">ชื่อ :</label>
                <input type="text" className="rounded w-full px-3 py-1 bg-white border focus:border-blue-600 focus:outline-none" placeholder="-"/>
              </div>
              <div>
                <label className="block font-medium">อีเมล :</label>
                <input type="email" className="rounded w-full px-3 py-1 bg-white border focus:border-blue-600 focus:outline-none" placeholder="-" />
              </div>
              <div>
                <label className="block font-medium">เพศ :</label>
                <input type="text" className="rounded w-full px-3 py-1 bg-white border focus:border-blue-600 focus:outline-none" placeholder="-" />
              </div>
              <div>
                <label className="block font-medium">วันเกิด :</label>
                <input type="date" className="rounded w-full px-3 py-1 bg-white border focus:border-blue-600 focus:outline-none " />
              </div>
              <div>
                <label className="block font-medium">น้ำหนัก :</label>
                <input type="text" className="rounded w-full px-3 py-1 bg-white border focus:border-blue-600 focus:outline-none" placeholder="-" />
              </div>
              <div>
                <label className="block font-medium">ส่วนสูง :</label>
                <input type="text" className="rounded w-full px-3 py-1 bg-white border focus:border-blue-600 focus:outline-none" placeholder="-" />
              </div>
              

              <div>
              <hr className="my-6 border-gray-400"/>
              </div>

              <div>
                <label className="block font-medium">รหัสผ่านเดิม :</label>
                <input type="password" className="rounded w-full px-3 py-1 bg-white border focus:border-blue-600 focus:outline-none" placeholder="-" />
              </div>
              <div>
                <label className="block font-medium">รหัสผ่านใหม่ :</label>
                <input type="password" className="rounded w-full px-3 py-1 bg-white border focus:border-blue-600 focus:outline-none" placeholder="-" />
              </div>
              <div>
                <label className="block font-medium">ยืนยันรหัสผ่าน :</label>
                <input type="password" className="rounded w-full px-3 py-1 bg-white border focus:border-blue-600 focus:outline-none" placeholder="-"/>
              </div>
            </div>

            {/* ปุ่มด้านล่าง */}
            <div className="flex justify-center gap-4 mt-6">
              <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                บันทึก
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
