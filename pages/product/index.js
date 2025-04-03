import Head from "next/head"
import Image from "next/image"
import styles from "@/styles/Product.module.css"
import Link from "next/link"

export async function getStaticProps(){
   const res = await fetch("https://dummyjson.com/products?limit=10")
   const data = await res.json ()
   return{
    props:{products:data.products}
   }
}



export default function Index({products}){

    return(
        <>
            <Head>
                <title  title>สินค้าทั้งหมด | NACK</title>
                <meta name="keywords" content="Nack,ร้านค้า,ขายเสื้อผ้า"/>
            </Head>
            <div className={styles.container}>
                {products.map(item=>(
                    <div key={item.id}>
                       <Link href={'/product/'+item.id}>
                            <h2 className={styles.title}>{item.title}</h2>
                            <Image src={item.thumbnail} width={300} height={300} alt={item.title}/>
                       </Link>
                    </div>
                ))}
            </div>
        </>
    )
}