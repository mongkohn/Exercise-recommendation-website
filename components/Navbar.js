import Link from "next/link"
import Image from "next/image"
export default function Navbar(){
    return(
        <nav>
            <div className="logo">
               <Link href="/">
                    <Image src="/logo.jpeg" width={100} height={80} alt="LOGO" ></Image>
               </Link>
            </div>
            <Link href="/bmr_bmi">การเผาผลาญพลังงานต่อวัน</Link>
            <Link href="/exercise">ท่าการออกกำลังกาย</Link>
            <Link href="/program">โปรแกรมออกกำลังกาย</Link>
            <Link href="/contact">ช่องทางการติดต่อ</Link>
            <Link href="/article">บทความ</Link>
            <Link href="about">ประวัติ</Link>
            <Link href="#">
                    <Image src="/icon.jpeg" width={40} height={40} alt="LOGO"></Image>
            </Link>

        </nav>
    )
}