"use client";

import { useState } from 'react';

type BMICategory = {
  min: number;
  max: number;
  label: string;
  advice: string;
  bgColor: string;
};

const bmiCategories: BMICategory[] = [
  {
    min: 0,
    max: 18.49,
    label: 'ผอม',
    advice: `BMI น้อยกว่า 18.50

น้ำหนักน้อยกว่ามาตรฐาน
... (ข้อความเดิม) ...`,
    bgColor: 'bg-yellow-50 border-yellow-400',
  },
  {
    min: 18.5,
    max: 22.9,
    label: 'ปกติ',
    advice: `BMI ระหว่าง 18.50 - 22.90
... (ข้อความเดิม) ...`,
    bgColor: 'bg-green-50 border-green-400',
  },
  {
    min: 23,
    max: 24.9,
    label: 'ท้วม',
    advice: `ท้วม 
... (ข้อความเดิม) ...`,
    bgColor: 'bg-orange-50 border-orange-400',
  },
  {
    min: 25,
    max: 29.9,
    label: 'อ้วน',
    advice: `อ้วน
... (ข้อความเดิม) ...`,
    bgColor: 'bg-orange-100 border-orange-500',
  },
  {
    min: 30,
    max: Number.POSITIVE_INFINITY,
    label: 'อ้วนมาก',
    advice: `อ้วนมาก 
... (ข้อความเดิม) ...`,
    bgColor: 'bg-red-100 border-red-500',
  },
];

function getBMICategory(bmi: number) {
  return bmiCategories.find(cat => bmi >= cat.min && bmi <= cat.max);
}

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(0);
  const [advice, setAdvice] = useState('');
  const [bgColor, setBgColor] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วนก่อนคำนวณ!');
      return;
    }
    const w = Number.parseFloat(weight);
    const h = Number.parseFloat(height) / 100;
    const result = w / (h * h);
    const bmiValue = Number.isNaN(result) ? 0 : Number.parseFloat(result.toFixed(2));
    setBmi(bmiValue);

    const category = getBMICategory(bmiValue);
    if (category) {
      setAdvice(category.advice);
      setBgColor(category.bgColor);
    } else {
      setAdvice('');
      setBgColor('');
    }
  };

  return (
    <div className="min-h-screen  p-10">
      <h1 className="text-center text-2xl font-bold m-4">
        เครื่องคำนวณหาค่าดัชนีมวลกาย (BMI)
      </h1>
      <p className="text-md text-center text-black mb-10">
        ค่า BMI คือค่าดัชนีที่ใช้ชี้วัดความสมดุลของน้ำหนักตัว (กิโลกรัม) และส่วนสูง (เซนติเมตร) ซึ่งสามารถระบุได้ว่า ตอนนี้รูปร่างของคนคนนั้นอยู่ในระดับใด ตั้งแต่อ้วนมากไปจนถึงผอมเกินไป
      </p>

      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-2xl shadow-md ">
        <p className="text-sm text-gray-700 mb-4 ">ใส่น้ำหนักและส่วนสูงของคุณ แล้วกดคำนวณเพื่อดูค่า BMI</p>

        <div className="space-y-4 mb-4">
          <div>
            <label htmlFor="weight-input" className="block text-sm font-medium">น้ำหนักตัว (Kg.)</label>
            <input
              id="weight-input"
              type="number"
              placeholder="น้ำหนัก (Kg.)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 text-black bg-white"
            />
          </div>
          <div>
            <label htmlFor="height-input" className="block text-sm font-medium">ส่วนสูง (Cm.)</label>
            <input
              id="height-input"
              type="number"
              placeholder="ส่วนสูง (Cm.)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 text-black bg-white"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={calculateBMI}
          className="w-full bg-blue-800 text-white py-2 rounded mb-4 hover:bg-blue-700"
        >
          คำนวณ
        </button>

        <div className="text-center border rounded py-6 mb-4 bg-white">
          <div className="text-sm text-gray-600 ">BMI</div>
          <div className="text-3xl font-bold text-blue-800">{bmi}</div>
        </div>

        <table className=" w-full text-sm text-left border bg-white rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">BMI</th>
              <th className="p-2">อยู่ในเกณฑ์</th>
              <th className="p-2">ภาวะเสี่ยงโรค</th>
            </tr>
          </thead>
          <tbody>
            <tr className={bmi > 0 && bmi < 18.5 ? 'bg-yellow-100 font-bold' : ''}>
              <td className="p-2">น้อยกว่า 18.5</td>
              <td>ผอม</td>
              <td>มากกว่าคนปกติ</td>
            </tr>
            <tr className={bmi >= 18.5 && bmi <= 22.9 ? 'bg-green-100  font-bold' : ''}>
              <td className="p-2">18.5 - 22.9</td>
              <td>ปกติ</td>
              <td>น้อย</td>
            </tr>
            <tr className={bmi >= 23 && bmi <= 24.9 ? 'bg-orange-100 font-bold' : ''}>
              <td className="p-2">23 - 24.9</td>
              <td>ท้วม</td>
              <td>เริ่มเสี่ยง</td>
            </tr>
            <tr className={bmi >= 25 && bmi <= 29.9 ? 'bg-orange-200 font-bold' : ''}>
              <td className="p-2">25 - 29.9</td>
              <td>อ้วน</td>
              <td>เสี่ยงสูง</td>
            </tr>
            <tr className={bmi >= 30 ? 'bg-red-200 font-bold' : ''}>
              <td className="p-2">มากกว่า 30</td>
              <td>อ้วนมาก</td>
              <td>เสี่ยงสูงมาก</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {advice && (
          <div className={`p-4 mt-4 rounded-lg text-gray-800 border-l-4 whitespace-pre-line ${bgColor}`}>
            {advice}
          </div>
        )}
        <div className="flex justify-center mt-10">
          <a href="/bmr&tdee">
            <button type="button" className=" bg-blue-800 text-white py-2  mb-4 hover:bg-blue-600 px-6 rounded-full transition">
              คำนวณ BMR & TDEE ต่อ
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
