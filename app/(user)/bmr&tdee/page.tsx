'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Calculator, Activity, Target, Zap } from 'lucide-react';

const activityOptions = [
  { value: '', label: 'เลือกกิจกรรมของคุณ' },
  { value: '1', label: 'ไม่ออกกำลังกายเลย (1.2x)' },
  { value: '2', label: 'ออกกำลังกายเบา ๆ (1-3 วัน/สัปดาห์) (1.375x)' },
  { value: '3', label: 'ออกกำลังกายปานกลาง (3-5 วัน/สัปดาห์) (1.55x)' },
  { value: '4', label: 'ออกกำลังกายหนัก (6-7 วัน/สัปดาห์) (1.725x)' },
  { value: '5', label: 'ออกกำลังกายหนักมาก (เช้า-เย็น) (1.9x)' },
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

  const textColor = gender === 'male' ? 'text-blue-600' : 'text-pink-600';
  const bgGradient = gender === 'male' 
    ? 'from-blue-500 to-blue-600' 
    : 'from-pink-500 to-pink-600';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Fitness Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-900/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl">
                <Calculator className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              เครื่องคำนวณการเผาผลาญพลังงาน
            </h1>
            <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
              <p className="text-blue-900 text-lg leading-relaxed">
                เพื่อความสะดวกและรวดเร็วในการคำนวณ เครื่องคำนวณหาค่า BMR TDEE และ
                เครื่องคำนวณช่วยวางแผนการลดน้ำหนัก
                เพื่อให้ผู้อ่านได้คำนวณค่าพลังงานที่เหมาะสมและเพื่อการวางแผนการลดน้ำหนักที่ได้ผล
                โดยไม่ต้องเสียเวลาคิดเองอีกต่อไป
              </p>
            </div>
          </div>

          {/* Step 1: BMR */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">Step 1: BMR คำนวณพลังงานพื้นฐาน</h2>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 mb-8">
              <p className="text-blue-900 text-lg leading-relaxed">
                BMR ย่อมาจาก Basal Metabolic Rate
                หรือเราสามารถเรียกได้ว่าเป็นอัตราการเผาผลาญพลังงานในแต่ละวัน
                โดยค่าพลังงานนี้ร่างกายจะใช้ในการขับเคลื่อนระบบและควบคุมอวัยวะต่างๆ
                ในร่างกาย
              </p>
            </div>

            <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
              {/* Gender Selection */}
              <div className="flex gap-4 mb-6">
                <button
                  className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    gender === 'male'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl'
                      : 'bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50'
                  }`}
                  onClick={() => setGender('male')}
                  type="button"
                >
                  ชาย
                </button>
                <button
                  className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    gender === 'female'
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-xl'
                      : 'bg-white border-2 border-pink-200 text-pink-700 hover:bg-pink-50'
                  }`}
                  onClick={() => setGender('female')}
                  type="button"
                >
                  หญิง
                </button>
              </div>

              {/* Input Fields */}
              <div className="space-y-6 mb-6">
                <div>
                  <label htmlFor="weight" className="block text-sm font-semibold text-blue-900 mb-2">
                    น้ำหนัก (กิโลกรัม)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    placeholder="กรอกน้ำหนักของคุณ"
                    value={weight}
                    onChange={handleInputChange(setWeight)}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-blue-900 placeholder-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-semibold text-blue-900 mb-2">
                    ส่วนสูง (เซนติเมตร)
                  </label>
                  <input
                    id="height"
                    type="number"
                    placeholder="กรอกส่วนสูงของคุณ"
                    value={height}
                    onChange={handleInputChange(setHeight)}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-blue-900 placeholder-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-semibold text-blue-900 mb-2">
                    อายุ (ปี)
                  </label>
                  <input
                    id="age"
                    type="number"
                    placeholder="กรอกอายุของคุณ"
                    value={age}
                    onChange={handleInputChange(setAge)}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-blue-900 placeholder-blue-400"
                  />
                </div>
              </div>

              {/* BMR Result */}
              <div className={`text-center p-6 rounded-2xl bg-gradient-to-r ${bgGradient} shadow-xl`}>
                <div className="text-white text-sm font-medium mb-2">BMR (แคลอรีต่อวัน)</div>
                <div className="text-white text-4xl font-bold">{bmr.toLocaleString()}</div>
                <div className="text-white/80 text-xs mt-1">แคลอรีที่ร่างกายใช้พื้นฐาน</div>
              </div>
            </div>
          </div>

          {/* Step 2: TDEE */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">Step 2: TDEE คำนวณพลังงานรวม</h2>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 mb-8">
              <p className="text-blue-900 text-lg leading-relaxed">
                TDEE คือ Total Daily Energy Expenditure
                หรือ ค่าของพลังงานที่ใช้กิจกรรมอื่นในแต่ละวัน
                โดยเลือกจากกิจกรรมตาม list ด้านล่าง
                ค่าที่ออกมาจะได้ค่าของการเผาผลาญพลังงานที่เป็นค่าเพียวๆ
                และค่าจากการทำกิจกรรมร่วมกัน
              </p>
            </div>

            <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
              <p className="text-blue-900 font-medium mb-6 text-center">
                เลือกระดับกิจกรรมของคุณเพื่อคำนวณพลังงานที่ใช้ในแต่ละวัน
              </p>
              
              <div className="mb-6">
                <select
                  value={activity}
                  onChange={e => setActivity(e.target.value)}
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-blue-900"
                >
                  {activityOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* TDEE Result */}
              <div className={`text-center p-6 rounded-2xl bg-gradient-to-r ${bgGradient} shadow-xl`}>
                <div className="text-white text-sm font-medium mb-2">TDEE (แคลอรีต่อวัน)</div>
                <div className="text-white text-4xl font-bold">{tdee.toLocaleString()}</div>
                <div className="text-white/80 text-xs mt-1">แคลอรีที่ต้องการต่อวัน</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <a href="/workouts">
              <button 
                type="button" 
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <Target className="w-6 h-6" />
                เลือกท่าการออกกำลังกาย
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

