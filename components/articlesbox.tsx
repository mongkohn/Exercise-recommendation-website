import React from 'react'
import Link from 'next/link'

export default function articlesbox() {
  return (
    <div>
        <div className="grid grid-cols-2 gap-6 p-4">
          <div className="max-w-sm bg-white rounded-xl overflow-hidden shadow-md">
            <img className="w-full h-48 object-cover" src="food.jpg" alt="อาหารเพื่อสุขภาพ" />

            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                อยากหุ่นดีขึ้น ไม่จำเป็นต้องกินแค่อกไก่และข้าวกล้อง
              </h2>
                <p className="text-sm text-gray-600 mt-2">
                อยากหุ่นดี ไม่ได้เป็นเรื่องที่ต้องฝืนกินให้อึดอัด! กับคำแนะนำดีๆ เรื่องอาหารที่กินได้จริงทุกวัน ไม่เบื่อแน่นอน
              </p>
              <Link href="#" className="text-blue-500 hover:underline inline-block mt-3 text-sm">
                อ่านต่อ...
              </Link>
            </div>
            <div className="max-w-sm bg-white rounded-xl overflow-hidden shadow-md">
            <img className="w-full h-48 object-cover" src="food.jpg" alt="อาหารเพื่อสุขภาพ" />

            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                อยากหุ่นดีขึ้น ไม่จำเป็นต้องกินแค่อกไก่และข้าวกล้อง
              </h2>
                <p className="text-sm text-gray-600 mt-2">
                อยากหุ่นดี ไม่ได้เป็นเรื่องที่ต้องฝืนกินให้อึดอัด! กับคำแนะนำดีๆ เรื่องอาหารที่กินได้จริงทุกวัน ไม่เบื่อแน่นอน
              </p>
              <Link href="#" className="text-blue-500 hover:underline inline-block mt-3 text-sm">
                อ่านต่อ...
              </Link>
            </div>
          </div>
        
        </div>
    </div>
  </div>
  )
}

 

