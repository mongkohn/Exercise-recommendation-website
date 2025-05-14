import React from 'react'

export default function contact() {
  return (
    <div className="  text-gray-800 pt-10">
      {/* ส่วนหัว */}
      <div className="text-center py-20  ">
        <h1 className="text-3xl font-bold">Contact US</h1>
      </div>

      {/* ข้อมูลติดต่อ */}
      <div className="max-w-5xl mx-auto pb-20 grid md:grid-cols-2 gap-8 px-4 mb-20">
        {/* EDR space Rangsit */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4">EDR space Rangsit</h2>
          <p>📞 <a href="tel:0926241304" className="text-blue-600 hover:underline">092-624-1304</a></p>
          <p>📞 <a href="tel:0927511329" className="text-blue-600 hover:underline">092-751-1329</a></p>
        </div>

        {/* EDR space online */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4">EDR space online</h2>
          <p>📧 <a href="mailto:mongkohn.kubpom@gmail.com" className="text-blue-600 hover:underline">mongkohn.kubpom@gmail.com</a></p>
          <p>📧 <a href="mailto:okm6344@gmail.com" className="text-blue-600 hover:underline">okm6344@gmail.com</a></p>
        </div>
      </div>
    </div>
  )
}