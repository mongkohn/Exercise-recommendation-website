import Image from "next/image"
import Head from "next/head"
import styles from "@/styles/Detail.module.css"



export async function getStaticPaths(){
        const res = await fetch("https://dummyjson.com/products?limit=10")
        const data = await res.json ()
        const paths = data.products.map((item)=>{
            return{
                params:{id:String(item.id)}
            }
        })
        return{
            paths,
            fallback:false
            
        }

    }
export async function getStaticProps({params}){
        const id = params.id
        const res = await fetch("https://dummyjson.com/products/"+id)
        const data = await res.json ()
        return{
            props:{product:data}
        }
     }


export default function ProductDatail({product}){
    return(
        <>
            <Head>
                <title>{product.title}</title>
            </Head>
            <div className={styles.container}>
                <div>
                    <Image src={product.thumbnail} width={300} height={300} alt={product.title}/>
                </div>
                <div className={styles.detail}>
                    <h1>ชื่อสินค้า: {product.title}</h1>
                    <h1>ราคา: {product.price}</h1>
                    <h1>หมวดหมู่: {product.category}</h1>
                    <h1>แบรนด์ : {product.brand}</h1>
                    <p>ข้อมูลพื้นฐาน :{product.description} </p>
                </div>

            </div>
        </>
    )
}