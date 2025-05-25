"use client";

import Image from "next/image";
import programList from "@/data/programList.json";

export default function ProgramManagement() {
  return (
    <section className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-900">จัดการโปรแกรม</h2>
        <div className="flex gap-3">
          <button type="button" className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition font-medium">
            เพิ่มโปรแกรม
          </button>
          <button type="button" className="px-6 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition font-medium">
            ลบโปรแกรม
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {programList.map((program, idx) => (
          <div key={program.name || idx} className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-all duration-300">
            <Image
              src={program.image}
              alt={program.name}
              width={400}
              height={192}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {program.name}
              </h3>
              <p className="text-blue-700 text-sm">{program.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
