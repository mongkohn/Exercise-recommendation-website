'use client';

import { useState, useEffect, type ChangeEvent } from 'react';

const activityOptions = [
  { value: '', label: 'เลือกกิจกรรมของคุณ' },
  { value: '1', label: 'ไม่ออกกำลังกายเลย' },
  { value: '2', label: 'ออกกำลังกายเบา ๆ (1-3 วัน/สัปดาห์)' },
  { value: '3', label: 'ออกกำลังกายปานกลาง (3-5 วัน/สัปดาห์)' },
  { value: '4', label: 'ออกกำลังกายหนัก (6-7 วัน/สัปดาห์)' },
  { value: '5', label: 'ออกกำลังกายหนักมาก (เช้า-เย็น)' },
];

export default function BmrCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('');
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);

  useEffect(() => {
    // Calculate BMR
    if (!weight || !height || !age) {
      setBmr(0);
      setTdee(0);
      return;
    }
    const w = Number.parseFloat(weight);
    const h = Number.parseFloat(height);
    const a = Number.parseFloat(age);

    let bmrResult = 0;
    if (gender === 'male') {
      bmrResult = 66 + (13.7 * w) + (5 * h) - (6.8 * a);
    } else {
      bmrResult = 655 + (9.6 * w) + (1.8 * h) - (4.7 * a);
    }
    bmrResult = bmrResult ? Number.parseFloat(bmrResult.toFixed(2)) : 0;
    setBmr(bmrResult);

    // Calculate TDEE
    let factor = 1.2;
    switch (activity) {
      case '2': factor = 1.375; break;
      case '3': factor = 1.55; break;
      case '4': factor = 1.725; break;
      case '5': factor = 1.9; break;
      default: factor = 1.2;
    }
    const tdeeResult = activity ? Number.parseFloat((bmrResult * factor).toFixed(2)) : 0;
    setTdee(tdeeResult);
  }, [gender, weight, height, age, activity]);

  const handleInputChange = (setter: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const textColor = gender === 'male' ? 'text-blue-800' : 'text-pink-500';

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-center text-2xl font-bold m-4">
        เครื่องคำนวณการเผาผลาญพลังงาน (BMR)
      </h1>
      <p className="text-md text-center max-w-3xl mx-auto mb-4">
        เพื่อความสะดวกและรวดเร็วในการคำนวณ เครื่องคำนวณหาค่า BMR TDEE และ
        เครื่องคำนวณช่วยวางแผนการลดน้ำหนัก
        เพื่อให้ผู้อ่านได้คำนวณค่าพลังงานที่เหมาะสมและเพื่อการวางแผนการลดน้ำหนักที่ได้ผล
        โดยไม่ต้องเสียเวลาคิดเองอีกต่อไป
      </p>
      <h2 className=" text-lg font-bold  max-w-3xl mx-auto mb-6">Step 1: BMR</h2>
      <p className="text-md text-center max-w-3xl mx-auto mb-6 ">
        BMR ย่อมาจาก Basal Metabolic Rate
        หรือเราสามารถเรียกได้ว่าเป็นอัตราการเผาผลาญพลังงานในแต่ละวัน
        โดยค่าพลังงานนี้ร่างกายจะใช้ในการขับเคลื่อนระบบเเละควบคุมอวัยวะต่างๆ
        ในร่างกายค่ะ เรามาหาค่าพลังงานที่ใช้ในส่วนนี้กันก่อนค่ะ
        โดยการกรอกข้อมูลในเครื่องคำนวณด้านล่างนี้ค่ะ
      </p>
      {/* Step 1: BMR */}
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-2xl shadow-md mb-8">
        <div className="flex gap-4 mb-4">
          <button
            className={`flex-1 py-2 rounded ${gender === 'male'
              ? 'bg-blue-700 text-white'
              : 'bg-white border'}`}
            onClick={() => setGender('male')}
            type="button"
          >
            ชาย
          </button>
          <button
            className={`flex-1 py-2 rounded ${gender === 'female'
              ? 'bg-pink-500 text-white'
              : 'bg-white border'}`}
            onClick={() => setGender('female')}
            type="button"
          >
            หญิง
          </button>
        </div>
        <div className="space-y-4 mb-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium">น้ำหนัก (Kg.)</label>
            <input
              id="weight"
              type="number"
              placeholder="น้ำหนัก (Kg.)"
              value={weight}
              onChange={handleInputChange(setWeight)}
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium">ส่วนสูง (Cm.)</label>
            <input
              id="height"
              type="number"
              placeholder="ส่วนสูง (Cm.)"
              value={height}
              onChange={handleInputChange(setHeight)}
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium">อายุ (ปี)</label>
            <input
              id="age"
              type="number"
              placeholder="อายุ (ปี)"
              value={age}
              onChange={handleInputChange(setAge)}
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>
        </div>
        <div className="text-center mt-4 border rounded py-4 bg-white">
          <div className="text-sm text-gray-600">BMR (kcal)</div>
          <div className={`text-2xl font-bold ${textColor}`}>{bmr}</div>
        </div>
      </div>
      <h2 className="text-lg font-bold  max-w-3xl mx-auto mb-6">Step 2: TDEE</h2>
      <p className="text-md  max-w-3xl mx-auto  mb-4 ">
        TDEE คือ Total Daily Energy Expenditure
        หรือ ค่าของพลังงานที่ใช้กิจกรรมอื่นในแต่ละวัน
        โดยเลือกจากกิจกรรมตาม list ด้านล่าง
        ค่าที่ออกมาจะได้ค่าของการเผาผลาญพลังงานที่เป็นค่าเพียวๆ
        เเละค่าจากการทำกิจกรรมร่วมกัน
      </p>
      {/* Step 2: TDEE */}
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-2xl shadow-md">
        <p className="text-sm text-gray-600  mb-4 ">
          เลือกระดับกิจกรรมของคุณเพื่อคำนวณพลังงานที่ใช้ในแต่ละวัน
        </p>
        <div className="space-y-3 mb-4">
          <select
            value={activity}
            onChange={e => setActivity(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
          >
            {activityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="text-center mt-4 border rounded py-4 bg-white">
          <div className="text-sm text-gray-600">TDEE (kcal)</div>
          <div className={`text-2xl font-bold ${textColor}`}>{tdee}</div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <a href="/workouts">
          <button type="button" className=" bg-blue-800 text-white py-2  mb-4 hover:bg-blue-600 px-6 rounded-full transition">
            เลือกท่าการออกกำลังกาย
          </button>
        </a>
      </div>
    </div>
  );
}

