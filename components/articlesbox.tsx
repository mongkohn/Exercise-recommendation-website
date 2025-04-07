import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const articles =[
  {
    title : "อยากหุ่นดีขึ้น ไม่จำเป็นต้องกินแค่อกไก่และข้าวกล้อง",
    description : "อยากหุ่นดี ไม่ได้เป็นเรื่องที่ต้องฝืนกินให้อึดอัด! กับคำแนะนำดีๆ เรื่องอาหารที่กินได้จริงทุกวัน ไม่เบื่อแน่นอน",
    image : "food.jpg",
    link : "#",
  },
  {
    title : "อยากหุ่นดีขึ้น ไม่จำเป็นต้องกินแค่อกไก่และข้าวกล้อง",
    description : "อยากหุ่นดี ไม่ได้เป็นเรื่องที่ต้องฝืนกินให้อึดอัด! กับคำแนะนำดีๆ เรื่องอาหารที่กินได้จริงทุกวัน ไม่เบื่อแน่นอน",
    image : "food.jpg",
    link : "#",
  },
  {
    title : "อยากหุ่นดีขึ้น ไม่จำเป็นต้องกินแค่อกไก่และข้าวกล้อง",
    description : "อยากหุ่นดี ไม่ได้เป็นเรื่องที่ต้องฝืนกินให้อึดอัด! กับคำแนะนำดีๆ เรื่องอาหารที่กินได้จริงทุกวัน ไม่เบื่อแน่นอน",
    image : "food.jpg",
    link : "#",
  },
]

export default function Articlesbox() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
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

 

