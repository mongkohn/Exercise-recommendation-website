"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Calculator, Scale, Heart, Target, TrendingUp } from 'lucide-react';

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
    advice: 
`BMI น้อยกว่า 18.50
น้ำหนักน้อยกว่ามาตรฐาน
คุณมีน้ำหนักน้อยหรือผอม โดยทั่วไป ค่าดัชนีมวลกายปกติมีค่าน้อยกว่า 18.50

ข้อแนะนำ
1. กรณีกินเยอะแต่ไม่อ้วน ก็ต้องระวังเรื่องคุณภาพของอาหารที่กินเข้าไปด้วย เลือกกินอาหารที่ดี มีประโยชน์ ลดหวาน มัน เค็ม และหลีกเลี่ยงอาหารที่มีไขมันสูง เพราะอาจเพิ่มความเสี่ยงต่อการเป็นโรคเบาหวาน ความดันเลือดสูง ไขมันในเลือดสูง หรือผอมลงพุงได้
2. เลือกกินอาหารให้หลากหลายครบ 5 หมู่ โดยเน้นอาหารที่มีโปรตีน เพื่อช่วยในการเสริมสร้างกล้ามเนื้อ หากต้องการเพิ่มน้ำหนัก ให้ไม่ผอมจนเกินไป ให้เพิ่มปริมาณการกินอาหารประมาณ 300-500 กิโลแคลอรี โดยเน้นการกินอาหารที่มีประโยชน์ คาร์โบไฮเดรตเชิงซ้อน และไขมันดี
3. เคลื่อนไหว และออกกำลังกายสม่ำเสมอ ระดับความหนักปานกลาง โดยเลือกกิจกรรมการออกกำลังกายที่ชื่นชอบและสนุกสนาน เพื่อส่งเสริมให้อยากออกกำลังกาย ลดความเบื่อหน่าย เช่น การเต้นเข้าจังหวะ เดิน วิ่ง ว่ายน้ำ หรือกิจกรรมออกแรง ขยับร่างกายในชีวิตประจำวัน อย่างการทำงานบ้าน การทำสวน เป็นต้น แนะนำให้ออกกำลังกาย อย่างน้อยวันละ 30 นาที หรือ ไม่น้อยกว่า 150 นาทีต่อสัปดาห์`,
    bgColor: 'bg-yellow-50 border-yellow-400',
  },
  {
    min: 18.5,
    max: 22.9,
    label: 'ปกติ',
    advice: `BMI ระหว่าง 18.50 - 22.90
น้ำหนักปกติ
คุณมีน้ำหนักอยู่ในเกณฑ์มาตรฐาน ค่าดัชนีมวลกายมีค่าระหว่าง 18.50 - 22.90

ข้อแนะนำ
1. เลือกกินอาหารให้ได้สัดส่วนพอเหมาะ และเลือกอาหารที่ดี มีประโยชน์ ครบ 5 หมู่ กำหนดปริมาณอาหารให้เพียงพอต่อความต้องการ การใช้พลังงานของร่างกาย อาหารกลุ่มคาร์โบไฮเดรตให้เลือกเป็น ข้าว-แป้งขัดสีน้อย ธัญพืช ไม่น้อยกว่า 6 ทัพพี กินผักหลากหลาย ถั่ว ผลไม้อ่อนหวาน รวมกันไม่น้อยกว่า 400 กรัมต่อวัน เพื่อให้ได้รับสารอาหาร วิตามิน เกลือแร่อย่างเพียงพอ เกิดความสมดุลด้านโภชนาการ และมีส่วนช่วยให้รักษา และควบคุมน้ำหนักให้อยู่ในเกณฑ์ได้

2. ออกกำลังกาย หรือเคลื่อนไหวร่างกายสม่ำเสมอ เลือกความเข้มข้นของกิจกรรมการออกกำลังกาย ที่ระดับปานกลาง หรือ ใช้ชีวิตให้กระฉับกระเฉง ลุกเดิน เคลื่อนไหวร่างกายบ่อยๆ หากรักในการออกกำลังกาย ควรเลือกกิจกรรมที่ชื่นชอบและสนุกสนาน จะช่วยลดความเบื่อหน่าย ทำได้บ่อย และสม่ำเสมอมากขึ้น นอกจากนี้การออกกำลังกาย มีส่วนช่วยให้สุขภาพร่างกายแข็งแรง สมบูรณ์ กล้ามเนื้อแข็งแรง มีส่วนช่วยลดความเสี่ยงในการเกิดโรคไม่ติดต่อเรื้อรัง(NCDs) ต่างๆ ได้ ถ้าหากต้องการให้สมรรถภาพร่างกายดีขึ้น ควรเลือกการออกกำลังกายแบบแอโรบิค เช่น เดินเร็วๆ วิ่งเหยาะ ถีบจักรยานเร็วๆ กระโดดเชือก ว่ายน้ำ หรือเล่นกีฬา โดยทำสม่ำเสมอวันละ 20 - 30 นาที อย่างน้อย 3 - 4 วัน / สัปดาห์`,
    bgColor: 'bg-green-50 border-green-400',
  },
  {
    min: 23,
    max: 24.9,
    label: 'ท้วม',
    advice: `BMI ระหว่าง 23 - 24.90
ท้วม
ถ้าคุณไม่ใช่คนออกกำลังกาย คุณเริ่มมีน้ำหนักเกินมาตรฐาน หรือมีรูปร่างท้วม ค่าดัชนีมวลกายมีค่าระหว่าง 23 - 24.90

ข้อแนะนำ
1. ต้องเริ่มควบคุม และเลือกกินอาหารให้เหมาะสม ปรับเปลี่ยนพฤติกรรมการกินอาหาร โดยเน้นเลือกกินอาหารที่ดีมีประโยชน์ ครบ 5 หมู่ กำหนดปริมาณตามความต้องการพลังงานของร่างกาย หรือลดจากเดิมเล็กน้อย ประมาณ 200-300 กิโลแคลอรี โดยค่าปริมาณพลังงานจากอาหารที่กินในแต่ละวันเฉลี่ยไม่ควรน้อยกว่า 1,000 - 1,200 กิโลแคลอรี หรือไม่น้อยกว่าค่า BMR ของแต่ละคน เพื่อป้องกันการจำกัดอาหารมากจนเกินไป ที่อาจส่งผลให้ร่างกายได้รับสารอาหารไม่เพียงพอ

ใส่ใจเรื่องโภชนาการให้มากขึ้น ลดอาหารหวาน มัน และเค็มจัด โดยเฉพาะ อาหาร ขนม ของหวาน เครื่องดื่มที่มีน้ำตาล และเครื่องดื่มที่มีแอลกอฮอล์ อาหารแปรรูปต่างๆ กินอาหารให้หลากหลายในสัดส่วนที่เหมาะสม เลือกกินข้าว - แป้ง ขัดสีน้อย ธัญพืชต่างๆ และกินผัก - ผลไม้อย่างน้อย 400 กรัม / วัน ไม่อด ไม่งดอาหารมากจนเกินไป เพื่อให้สามารถควบคุมอาหารได้ดีมากยิ่งขึ้น

2. เคลื่อนไหว และออกกำลังกายแบบแอโรบิคอย่างสม่ำเสมอ เลือกความเข้มข้นปานกลาง โดยทำอย่างน้อยวันละ 30 - 40 นาที 4 - 5 วัน/สัปดาห์ สำหรับคนที่ไม่เคยออกกำลังกาย ควรเริ่มด้วยกิจกรรมเบาๆ เช่นการเดิน หรือ วิ่งจ๊อกกิ้ง ปั่นจักรยาน ทำต่อเนื่อง เพื่อให้ร่างกายเกิดความคุ้นเคย และพัฒนาความแข็งแรงขึ้น แล้วจึงค่อยๆ เพิ่มความเข้มข้นของกิจกรรมขึ้นทีละน้อย

3. เสริมการฝึกเวทเทรนนิ่ง เพื่อเพิ่มความแข็งแรง และปริมาณของกล้ามเนื้อ ที่มีส่วนช่วยในการเผาผลาญพลังงาน และทำให้ไขมันลดลง สำหรับผู้ที่ไม่เคยฝึกการออกกำลังกายแบบใช้แรงต้าน หรือ เวทเทรนนิ่ง อาจเริ่มต้นด้วยกิจกรรมแบบบอดี้เวทง่ายๆ โดยใช้แรงต้านจากน้ำหนักตัวเอง เช่นการทำท่า แพลงกิ้ง สควอช หรือซิทอัพ ก็ได้ หรือหากต้องการใช้ลูกน้ำหนัก หรืออุปกรณ์เสริมแรงต้าน ก็ควรศึกษาหาข้อมูล หรือรับคำแนะนำจากผู้เชี่ยวชาญ ก่อนลงมือปฏิบัติ เพื่อป้องกันอุบัติเหตุ หรืออันตรายที่อาจเกิดขึ้นจากการออกกำลังกายผิดวิธี`,
    bgColor: 'bg-orange-50 border-orange-400',
  },
  {
    min: 25,
    max: 29.9,
    label: 'อ้วน',
    advice: `BMI ระหว่าง 25 - 29.90
อ้วน / อ้วนระดับ 2
ถ้าคุณไม่ใช่คนออกกำลังกาย คุณเข้าเกณฑ์อ้วนแล้ว (อ้วนระดับ 2) ค่าดัชนีมวลกายมีค่าระหว่าง 25 - 29.90

ข้อแนะนำ
การควบคุมอาหารมีส่วนสำคัญอย่างมาก ที่จะช่วยให้สามารถลดน้ำหนักให้อยู่ในเกณฑ์ปกติได้ ควรปรับเปลี่ยนพฤติกรรมการกินอาหาร โดยเลือกกินอาหารให้หลากกลาย แต่มีประโยชน์ กำหนดปริมาณการกินที่เหมาะสม ต่อความต้องการพลังงาน ไม่ลด ไม่งด หรือ อดอาหารมากจนเกินไป ลดพลังงานจากอาหารในแต่ละวันเล็กน้อย ประมาณ 200 - 300 กิโลแคลอรี โดยค่าปริมาณพลังงานจากอาหารที่กินในแต่ละวันเฉลี่ยไม่ควรน้อยกว่า 1,000 - 1,200 กิโลแคลอรี หรือไม่น้อยกว่าค่า BMR ของแต่ละคน ลด หรือหลีกเลี่ยงการกินอาหารที่มีน้ำตาลสูง ขนมหวาน , เครื่องดื่มที่มีรสหวาน ของทอด อาหารแปรรูป อาหารที่มีไขมันอิ่มตัวสูง และควรควบคุมอาหารที่มีปริมาณโซเดียมสูงด้วย

เลือกกินอาหารโดยเน้นที่โภชนาการครบถ้วน เพื่อให้ร่างกายได้สารอาหาร และวิตามินที่มีประโยชน์ เช่น ข้าว - แป้งขัดสีน้อย ธัญพืช ถั่ว เนื้อสัตว์ไขมันต่ำ อกไก่ ไข่ และเนื้อปลา กินผักและผลไม้อ่อนหวาน ในสัดส่วนที่พอเหมาะ หรืออย่างน้อย 400 กรัมต่อคนต่อวัน`,
    bgColor: 'bg-orange-100 border-orange-500',
  },
  {
    min: 30,
    max: Number.POSITIVE_INFINITY,
    label: 'อ้วนมาก',
    advice: `BMI มากกว่า 30
อ้วนมาก / อ้วนระดับ 3
แย่แล้ว!! ถ้าคุณไม่ใช้คนออกกำลังกาย หรือนักเพาะกาย คุณอ้วนมากแล้ว (อ้วนระดับ 3) ค่าดัชนีมวลกายมีค่ามากกว่า 30

ข้อแนะนำ
เพื่อสุขภาพที่ดีขึ้น คุณต้องปรับเปลี่ยนพฤติกรรมแล้ว ถ้าอยากเปลี่ยนตัวเองให้กลับมามีรูปร่างสมส่วน โรคร้ายไม่ถามหา ต้องเริ่มใส่ใจเรื่องโภชนาการ และออกกำลังกายแล้ว โภชนาการมีส่วนสำคัญ ที่จะช่วยให้ลด และควบคุมน้ำหนักได้ดีขึ้น สำหรับคนที่คิดว่าตัวเองกินน้อย กินอาหารปกติแต่ยัง อ้วนมากๆ ควรเข้ารับคำปรึกษาจากแพทย์ เพื่อรับรักษาภาวะโรคอ้วน หรือถ้าอ้วนจากความเผลอเลอ กินดุ กินเก่ง ต้องควบคุมการกินอาหารให้ดี เลือกกินอาหารที่ดีมีประโยชน์ต่อร่างกาย ในปริมาณที่เหมาะสม ไม่งด ไม่อดอาหารมากจนเกินไป เพราะจะทำให้โหย หิวบ่อย และยอมแพ้ไปก่อน อาจลดปริมาณอาหารที่กินในแต่ละวันเล็กน้อยประมาณ 200 - 300 กิโลแคลอรี โดยค่าปริมาณพลังงานจากอาหารที่กินในแต่ละวันเฉลี่ยไม่ควรน้อยกว่า 1,000 - 1,200 กิโลแคลอรี หรือต้องไม่น้อยกว่าค่า BMR ของแต่ละคน

เลือกกินให้มากๆ ลดอาหารหวาน ของหวาน ขนม เครื่องดื่มที่มีน้ำตาล งด หรือหลีกเลี่ยงของทอด อาหารไขมันสูง อาหารที่มีไขมันอิ่มตัวสูง อาหารแปรรูป เบเกอรี่ ขนมซองต่างๆ และเครื่องดื่มที่มีแอลกอฮอล์ อาหารเค็มจัด โซเดียมสูง`,
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

  const getBMIColor = () => {
    if (bmi === 0) return 'text-blue-600';
    if (bmi < 18.5) return 'text-yellow-600';
    if (bmi <= 22.9) return 'text-green-600';
    if (bmi <= 24.9) return 'text-orange-600';
    if (bmi <= 29.9) return 'text-red-500';
    return 'text-red-700';
  };

  const getBMILabel = () => {
    if (bmi === 0) return '';
    const category = getBMICategory(bmi);
    return category ? category.label : '';
  };

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
              <div className="p-4 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-2xl">
                <Scale className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              เครื่องคำนวณดัชนีมวลกาย
            </h1>
            <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
              <p className="text-blue-900 text-lg leading-relaxed">
                ค่า BMI คือค่าดัชนีที่ใช้ชี้วัดความสมดุลของน้ำหนักตัว (กิโลกรัม) และส่วนสูง (เซนติเมตร) 
                ซึ่งสามารถระบุได้ว่า ตอนนี้รูปร่างของคนคนนั้นอยู่ในระดับใด ตั้งแต่อ้วนมากไปจนถึงผอมเกินไป
              </p>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* Calculator Form */}
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">คำนวณ BMI ของคุณ</h2>
              </div>
              
              <p className="text-blue-700 mb-6">
                ใส่น้ำหนักและส่วนสูงของคุณ แล้วกดคำนวณเพื่อดูค่า BMI
              </p>

              <div className="space-y-6 mb-6">
                <div>
                  <label htmlFor="weight-input" className="block text-sm font-semibold text-blue-900 mb-2">
                    น้ำหนักตัว (กิโลกรัม)
                  </label>
                  <input
                    id="weight-input"
                    type="number"
                    placeholder="กรอกน้ำหนักของคุณ"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-blue-900 placeholder-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="height-input" className="block text-sm font-semibold text-blue-900 mb-2">
                    ส่วนสูง (เซนติเมตร)
                  </label>
                  <input
                    id="height-input"
                    type="number"
                    placeholder="กรอกส่วนสูงของคุณ"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-blue-900 placeholder-blue-400"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={calculateBMI}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                คำนวณ BMI
              </button>

              {/* BMI Result */}
              <div className="mt-8 text-center p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200">
                <div className="text-sm font-medium text-blue-700 mb-2">ค่า BMI ของคุณ</div>
                <div className={`text-5xl font-bold mb-2 ${getBMIColor()}`}>{bmi}</div>
                {getBMILabel() && (
                  <div className={`text-lg font-semibold ${getBMIColor()}`}>
                    {getBMILabel()}
                  </div>
                )}
              </div>
            </div>

            {/* BMI Chart */}
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-bold text-blue-900">เกณฑ์ค่า BMI</h2>
              </div>

              <div className="overflow-hidden rounded-2xl border-2 border-blue-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <th className="p-4 text-left font-semibold">BMI</th>
                      <th className="p-4 text-left font-semibold">เกณฑ์</th>
                      <th className="p-4 text-left font-semibold">ภาวะเสี่ยง</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={`transition-colors ${bmi > 0 && bmi < 18.5 ? 'bg-yellow-100 font-bold border-l-4 border-yellow-500' : 'bg-white hover:bg-blue-50'}`}>
                      <td className="p-4">น้อยกว่า 18.5</td>
                      <td className="p-4">ผอม</td>
                      <td className="p-4">มากกว่าคนปกติ</td>
                    </tr>
                    <tr className={`transition-colors ${bmi >= 18.5 && bmi <= 22.9 ? 'bg-green-100 font-bold border-l-4 border-green-500' : 'bg-white hover:bg-blue-50'}`}>
                      <td className="p-4">18.5 - 22.9</td>
                      <td className="p-4">ปกติ</td>
                      <td className="p-4">น้อย</td>
                    </tr>
                    <tr className={`transition-colors ${bmi >= 23 && bmi <= 24.9 ? 'bg-orange-100 font-bold border-l-4 border-orange-500' : 'bg-white hover:bg-blue-50'}`}>
                      <td className="p-4">23 - 24.9</td>
                      <td className="p-4">ท้วม</td>
                      <td className="p-4">เริ่มเสี่ยง</td>
                    </tr>
                    <tr className={`transition-colors ${bmi >= 25 && bmi <= 29.9 ? 'bg-red-100 font-bold border-l-4 border-red-500' : 'bg-white hover:bg-blue-50'}`}>
                      <td className="p-4">25 - 29.9</td>
                      <td className="p-4">อ้วน</td>
                      <td className="p-4">เสี่ยงสูง</td>
                    </tr>
                    <tr className={`transition-colors ${bmi >= 30 ? 'bg-red-200 font-bold border-l-4 border-red-600' : 'bg-white hover:bg-blue-50'}`}>
                      <td className="p-4">มากกว่า 30</td>
                      <td className="p-4">อ้วนมาก</td>
                      <td className="p-4">เสี่ยงสูงมาก</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Advice Section */}
          {advice && (
            <div className="mb-12">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-white" />
                    <h3 className="text-2xl font-bold text-white">คำแนะนำสำหรับคุณ</h3>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-blue-900 leading-relaxed whitespace-pre-line">
                    {advice}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center">
            <a href="/bmr&tdee">
              <button 
                type="button" 
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <Target className="w-6 h-6" />
                คำนวณ BMR & TDEE ต่อ
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
