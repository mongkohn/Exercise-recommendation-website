import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const articles = [
  {
    title: "วิ่งอย่างไร ไม่ให้เจ็บ",
    description: "วิ่งอย่างไร ไม่ให้เจ็บ การเลือกรองเท้าวิ่งก็เป็นสิ่งสำคัญ เริ่มจากการเดินเร็วหรือวิ่งเหยาะๆ ไม่ควรวิ่งแบบก้าวเท้ายาว ไม่ควรวิ่งขึ้น-ลงเนิน",
    image: "https://multimedia.anamai.moph.go.th/oawoocha/2023/12/info620_run_4_1-1024x1018.jpg",
    link : "https://multimedia.anamai.moph.go.th/infographics/info620_run_4/"
  },
  {
    title: "การออกกำลังกายเพื่อสุขภาพ",
    description: "บทความโดย ศาสตราจารย์แพทย์หญิงชุติมา ศิริกุลชยานนท์ ภาควิชาโภชนวิทยา คณะสาธารณสุขศาสตร์ มหาวิทยาลัยมหิดล",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Seal_of_the_Department_of_Health.svg",
    link : "/https://hpc11.anamai.moph.go.th/th/sa-suk-11/200024#"
  },
  {
    title: "SAVE YOUR HEALTH",
    description: "“Fitness”  หรือสถานประกอบกิจการเพื่อสุขภาพ ในปัจจุบันมีผู้ใช้บริการเป็นจำนวนมาก  โดยเฉพาะคนวัยทำงาน  เพราะการมีสุขภาพที่ดี คือ การออกกำลังกายอย่างน้อย สัปดาห์ละ 3 วันๆ ละ 30 นาที",
    image: "https://files.gqthailand.com/uploads/running.jpg",
    link : "https://multimedia.anamai.moph.go.th/help-knowledgs/save-your-health/"
  },
];

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {articles.map((article, idx) => (
          <div key={idx} className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-56 w-full">
              <Link href={article.link}>
              <Image
                src={article.image}
                alt={article.title}
                layout="fill"
                objectFit="cover"
              />
              </Link>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{article.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{article.description}</p>
              <Link href={article.link} className="text-blue-600 text-sm hover:underline">อ่านต่อ...</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

 

