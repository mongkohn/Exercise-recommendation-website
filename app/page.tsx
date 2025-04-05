"use client";
import Link from "next/link";
import Articlesbox from "../components/articlesbox";

export default function Home() {
  return(
    <>
   <div className="object-cover h-full w-full flex items-center justify-center ">
   <img src="welcome.jpeg" alt="img"  className="shadow-md rounded-lg"/>
   </div>
      <h1 className=" text-3xl flex items-center justify-center text-gray-700 font-bold ">
        บทความ
      </h1>
      <Articlesbox/>

    </>
    
    
  )
}
  