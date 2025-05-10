import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    title: "วิ่งอย่างไร ไม่ให้เจ็บ",
    description: "วิ่งอย่างไร ไม่ให้เจ็บ การเลือกรองเท้าวิ่งก็เป็นสิ่งสำคัญ เริ่มจากการเดินเร็วหรือวิ่งเหยาะๆ ไม่ควรวิ่งแบบก้าวเท้ายาว ไม่ควรวิ่งขึ้น-ลงเนิน",
    image: "https://multimedia.anamai.moph.go.th/oawoocha/2023/12/info620_run_4_1-1024x1018.jpg",
    link: "https://multimedia.anamai.moph.go.th/infographics/info620_run_4/",
    refer:"บทความโดย AnamaiMedia"
  },
  {
    title: "การออกกำลังกายเพื่อสุขภาพ",
    description: "ศาสตราจารย์แพทย์หญิงชุติมา ศิริกุลชยานนท์ ภาควิชาโภชนวิทยา คณะสาธารณสุขศาสตร์ มหาวิทยาลัยมหิดล",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Seal_of_the_Department_of_Health.svg",
    link: "https://hpc11.anamai.moph.go.th/th/sa-suk-11/200024#",
    refer:"บทความโดย ศูนย์อนามัยที่ 11 นครศรีธรรมราช"
  },
  {
    title: "SAVE YOUR HEALTH",
    description: "“Fitness” หรือสถานประกอบกิจการเพื่อสุขภาพ ในปัจจุบันมีผู้ใช้บริการเป็นจำนวนมาก โดยเฉพาะคนวัยทำงาน เพราะการมีสุขภาพที่ดี คือ การออกกำลังกายอย่างน้อย สัปดาห์ละ 3 วันๆ ละ 30 นาที",
    image: "https://files.gqthailand.com/uploads/running.jpg",
    link: "https://multimedia.anamai.moph.go.th/help-knowledgs/save-your-health/",
    refer:"บทความโดย AnamaiMedia"
  },
  {
    title: "ผักผลไม้ที่ช่วยทดแทนน้ำในร่างกาย และทำให้ร่างกายสดชื่น",
    description: "ช่วยทดแทนน้ำในร่างกายที่สูญเสียไปเรื่องจากอากาศร้อนได้ แถมยังมีสารต้านอนุมูลอิสระที่เกิดขึ้นตามธรรมชาติ ช่วยลดการอักเสบจากการเผาไหม้ของแสงแดดในหน้าร้อน",
    image: "https://multimedia.anamai.moph.go.th/oawoocha/2024/05/heath_me_43_fruit_1_0-768x768.jpg",
    link: "https://multimedia.anamai.moph.go.th/help-knowledgs/heath_me_43_fruit_1/",
    refer:"บทความโดย AnamaiMedia"
  },
  {
    title: "อาหารทะเลช่วงหน้าร้อนต้องระวังและเลือกเป็นพิเศษ",
    description: "การกินอาหารทะเลช่วงหน้าร้อนต้องระวังและเลือกเป็นพิเศษ เพราะ ในช่วงหน้าร้อน อาหารทะเลจะเน่าเสียง่าย อาจทำให้ร้านค้าบางรายใช้วิธีการไม่ถูกต้อง",
    image: "https://multimedia.anamai.moph.go.th/oawoocha/2024/05/heath_me_42_seafood_1-768x768.jpg",
    link: "https://multimedia.anamai.moph.go.th/help-knowledgs/heath_me_42_seafood_1/",
    refer:"บทความโดย AnamaiMedia"
  },
  {
    title: "ทุกวัย นอน ดี สุขภาพดี",
    description: "จากความเดิมคราวที่แล้ว ในเรื่อง “ต่างวัย (นอน) แตกต่าง” วัยแรกเกิด จนถึงอายุ 2 ปี มาคราวนี้ กรมอนามัย ขอแนะนำต่อ กับ ระยะการนอนหลับแต่ละช่วงวัย ตาม National Sleep Foundation ในช่วง “วัยเรียนวัยุร่น”",
    image: "https://multimedia.anamai.moph.go.th/oawoocha/2024/04/heath_me_34_sleep_2-768x767.jpg",
    link: "https://multimedia.anamai.moph.go.th/help-knowledgs/heath_me_34_sleep_2/",
    refer:"บทความโดย AnamaiMedia"
  },
];

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">แนะนำ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {articles.map((article, idx) => (
          <div key={idx} className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden hover:scale-105 transition">
            <div className="relative h-56 w-full">
              <Link href={article.link} passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <Image
                    src={article.image}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </a>
              </Link>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{article.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{article.description}</p>
              <p className="text-sm text-gray-500 mb-2 ">{article.refer}</p>
              <Link href={article.link} passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                  อ่านต่อ...
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
