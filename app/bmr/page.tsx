'use client';

import { useState } from 'react';

export default function BmrCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [bmr, setBmr] = useState(0);
  const [activity, setActivity] = useState('');
  const [tdee, setTdee] = useState(0);

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    let result = 0;
    if (gender === 'male') {
      result = 66 + (13.7 * w) + (5 * h) - (6.8 * a);
    } else {
      result = 655 + (9.6 * w) + (1.8 * h) - (4.7 * a);
    }
    setBmr(result ? parseFloat(result.toFixed(2)) : 0);
  };

  const calculateTDEE = () => {
    let factor = 1.2;
    switch (activity) {
      case '1': factor = 1.2; break;
      case '2': factor = 1.375; break;
      case '3': factor = 1.55; break;
      case '4': factor = 1.725; break;
      case '5': factor = 1.9; break;
    }
    const result = bmr * factor;
    setTdee(result ? parseFloat(result.toFixed(2)) : 0);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-center text-lg font-bold mb-4">
        เครื่องคำนวณการเผาผลาญพลังงาน (BMR)
      </h1>
      <p className="text-md text-center max-w-3xl mx-auto mb-4">
      เพื่อความสะดวกและรวดเร็วในการคำนวณ เครื่องคำนวณหาค่า BMR TDEE และ เครื่องคำนวณช่วยวางแผนการลดน้ำหนัก เพื่อให้ผู้อ่านได้คำนวณค่าพลังงานที่เหมาะสมและเพื่อการวางแผนการลดน้ำหนักที่ได้ผล โดยไม่ต้องเสียเวลาคิดเองอีกต่อไป
      </p>
      <h2 className=" text-lg font-bold  max-w-3xl mx-auto mb-6">Step 1: BMR</h2>
      <p className="text-md text-center max-w-3xl mx-auto mb-6 ">BMR ย่อมาจาก Basal Metabolic Rate หรือเราสามารถเรียกได้ว่าเป็นอัตราการเผาผลาญพลังงานในแต่ละวัน โดยค่าพลังงานนี้ร่างกายจะใช้ในการขับเคลื่อนระบบเเละควบคุมอวัยวะต่างๆ ในร่างกายค่ะ เรามาหาค่าพลังงานที่ใช้ในส่วนนี้กันก่อนค่ะ โดยการกรอกข้อมูลในเครื่องคำนวณด้านล่างนี้ค่ะ</p>
      {/* Step 1: BMR */}
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-2xl shadow-md mb-8">
        <div className="flex gap-4 mb-4">
          <button
            className={`flex-1 py-2 rounded ${gender === 'male' ? 'bg-blue-700 text-white' : 'bg-white border'}`}
            onClick={() => setGender('male')}
          >
            ชาย
          </button>
          <button
            className={`flex-1 py-2 rounded ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-white border'}`}
            onClick={() => setGender('female')}
          >
            หญิง
          </button>
        </div>

        <div className="space-y-4 mb-4">
        <div>
        <label className="block text-sm font-medium">น้ำหนัก (Kg.)</label>
          <input
            type="number"
            placeholder="น้ำหนัก (Kg.)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
          />
          </div>
          <div>
          <label className="block text-sm font-medium">ส่วนสูง (Cm.)</label>
          <input
            type="number"
            placeholder="ส่วนสูง (Cm.)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
          />
          </div>
          <div>
          <label className="block text-sm font-medium">อายุ (ปี)</label>
          <input
            type="number"
            placeholder="อายุ (ปี)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"/>
          </div>

        
        </div>

        <button
          onClick={calculateBMR}
          className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700"
        >
          คำนวณ
        </button>

        <div className="text-center mt-4 border rounded py-4 bg-white">
          <div className="text-sm text-gray-600">BMR (kcal)</div>
          <div className="text-2xl font-bold text-blue-800">{bmr}</div>
        </div>
      </div>
      <h2 className="text-lg font-bold  max-w-3xl mx-auto mb-6">Step 2: TDEE</h2>
      <p className="text-md  max-w-3xl mx-auto mb-6  mb-4 ">
      TDEE คือ Total Daily Energy Expenditure หรือ ค่าของพลังงานที่ใช้กิจกรรมอื่นในแต่ละวัน โดยเลือกจากกิจกรรมตาม list ด้านล่าง ค่าที่ออกมาจะได้ค่าของการเผาผลาญพลังงานที่เป็นค่าเพียวๆ เเละค่าจากการทำกิจกรรมร่วมกัน
        </p>
      {/* Step 2: TDEE */}
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-2xl shadow-md">
      
        <p className="text-sm text-gray-600  mb-4 ">
          เลือกระดับกิจกรรมของคุณเพื่อคำนวณพลังงานที่ใช้ในแต่ละวัน
        </p>
        <div className="space-y-3 mb-4">
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
          >
            <option value="">เลือกกิจกรรมของคุณ</option>
            <option value="1">ไม่ออกกำลังกายเลย</option>
            <option value="2">ออกกำลังกายเบา ๆ (1-3 วัน/สัปดาห์)</option>
            <option value="3">ออกกำลังกายปานกลาง (3-5 วัน/สัปดาห์)</option>
            <option value="4">ออกกำลังกายหนัก (6-7 วัน/สัปดาห์)</option>
            <option value="5">ออกกำลังกายหนักมาก (เช้า-เย็น)</option>
          </select>
        </div>

        <button
          onClick={calculateTDEE}
          className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700"
        >
          คำนวณ
        </button>

        <div className="text-center mt-4 border rounded py-4 bg-white">
          <div className="text-sm text-gray-600">TDEE (kcal)</div>
          <div className="text-2xl font-bold text-blue-800">{tdee}</div>
        </div>
      </div>
    </div>
  );
}
