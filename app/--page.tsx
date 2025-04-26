"use client";
import Articlesbox from "@/components/articlesbox";

export default function Home() {
  return(
    <>
   <div className="object-cover h-full w-full flex items-center justify-center ">
   <img src="welcome.jpeg" alt="img"  className="shadow-md rounded-lg"/>
   </div>
   <h1 className=" text-3xl flex items-center justify-center text-blue-700 font-bold mt-10 pt-10">
        บทความ
      </h1>
      <Articlesbox/>
    </>

  )
}
  