import Image from "next/image";
import Link from "next/link";


const articles = [
  {
    title: "YOGA FOR OFFICE SYNDROME",
    description: "คลายปวดใน 4 สัปดาห์",
    image: "#",
    link : "#"
  },
  {
    title: "Healthy And Lean in 30 Days for Women",
    description: "สลักกล้ามเนื้อ เบิร์นไขมันกระชับสัดส่วนแบบสุขภาพดี ภายใน 30 วัน เพื่อสาวๆ โดยเฉพาะ",
    image: "#",
    link : "#"
  },
  {
    title: "5 สัญญาณเตือนว่าเราควรจะ “หยุดลดน้ำหนัก” หรือ “เปลี่ยนรูปแบบการกิน”",
    description: "เพราะยังทำวันนี้แต่ละทำให้แย่ลง มีผลเสียต่อร่างกายและจิตใจ มีแนวโน้มว่าหนักตัวเดิมขึ้นมากกว่าเดิม",
    image: "#",
    link : "#"
  },
];

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center  text-gray-800 mb-12">แนะนำ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {articles.map((article, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative h-56 w-full">
              <Image
                src={article.image}
                alt={article.title}
                layout="fill"
                objectFit="cover"
              />
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
