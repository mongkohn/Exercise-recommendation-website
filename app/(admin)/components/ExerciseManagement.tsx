"use client";

import { useState } from "react";
import Image from "next/image";
import exerciseList from "@/data/exerciseList.json";

type Exercise = {
  name: string;
  image: string;
  description: string;
};

export default function ExerciseManagement() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  if (selectedExercise) {
    return (
      <section className="p-8 max-w-6xl mx-auto">
        <div className="w-full flex justify-start mb-6">
          <button
            type="button"
            onClick={() => setSelectedExercise(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
          >
            ← ย้อนกลับ
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">{selectedExercise.name}</h1>

          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="lg:w-2/3 w-full aspect-video">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src="https://drive.google.com/file/d/1uniMG91kgmaJfp8omHg5puteH3fu-WZV/preview"
                title={selectedExercise.name}
                allowFullScreen
              />
            </div>

            <div className="flex-1 border border-blue-100 p-6 rounded-xl shadow-sm bg-blue-50">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">อธิบายท่าออกกำลังกาย</h2>
              <div className="text-blue-800 space-y-3">
                <p>1. โน้มตัวไปข้างหน้า 45 องศา</p>
                <p>2. ให้จับบาร์กว้างกว่าไหล่</p>
                <p>3. ดึงข้อศอกไปด้านหลัง เกร็งหลัง</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h2 className="font-semibold text-lg text-blue-900 mb-3">อุปกรณ์ที่ใช้</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white px-4 py-2 rounded-full text-sm text-blue-800 shadow-sm border border-blue-200">
                  บาร์เบล
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h2 className="font-semibold text-lg text-blue-900 mb-3">กล้ามเนื้อ</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white px-4 py-2 rounded-full text-sm text-blue-800 shadow-sm border border-blue-200">
                  หลัง
                </span>
                <span className="bg-white px-4 py-2 rounded-full text-sm text-blue-800 shadow-sm border border-blue-200">
                  แขน
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-900">จัดการท่าออกกำลังกาย</h2>
        <button
          type="button"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition font-medium"
        >
          เพิ่มท่าใหม่
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exerciseList.map((exercise, index) => (
          <button
            type="button"
            key={exercise.name}
            onClick={() => setSelectedExercise(exercise)}
            className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden text-left transition-all duration-300 hover:scale-105"
          >
            <Image
              src={exercise.image}
              alt={exercise.name}
              width={400}
              height={192}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-900">{exercise.name}</h3>
              <p className="text-blue-700 text-sm mt-2">{exercise.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
