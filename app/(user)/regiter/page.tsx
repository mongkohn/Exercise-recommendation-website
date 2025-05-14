import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-5xl">

        {/* ซ้าย: โลโก้ */}
        <div className="md:w-1/2 bg-white p-6 flex flex-col items-center justify-center">
          <Image
            src="/logo.jpeg"
            alt="ERD Logo"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* ขวา: ฟอร์มสมัคร */}
        <div className="md:w-1/2 p-8">
          {/* Navbar */}
          <div className="flex justify-end mb-6 text-sm font-bold">
            <Link href="/login" className="text-black hover:text-blue-500">เข้าสู่ระบบ</Link>
            <span className="mx-2">|</span>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1 font-medium ">Username</label>
              <input
                id="username"
                type="text"
                placeholder="ไอดี"
                className="w-full px-4 py-2 border rounded-md placeholder-gray-400 bg-white  focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="อีเมล"
                className="w-full px-4 py-2 border  rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="fullname" className='block mb-1 font-medium'>ชื่อ</label>
              <input
                id="fullname"
                type="text"
                placeholder='ชื่อ-นามสกุล'
                className='w-full px-4 py-2 border  rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600'
              />
            </div>
            <div>
              <label htmlFor="gender" className='block mb-1 font-medium'>เพศ</label>
              <input
                id="gender"
                type="text"
                placeholder='เพศ'
                className='w-full px-4 py-2 border  rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600' />
            </div>
            <div>
              <label htmlFor="birthday" className='block mb-1 font-medium'>วันเกิด</label>
              <input
                id="birthday"
                type="date"
                className='w-full px-4 py-2 border  rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600' />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="รหัสผ่าน"
                className="w-full px-4 py-2 border rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-1 font-medium">Confirm-Password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="ยืนยันรหัสผ่าน"
                className="w-full px-4 py-2 border rounded-md placeholder-gray-400 bg-white focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-500 transition"
            >
              สมัครสมาชิก
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
