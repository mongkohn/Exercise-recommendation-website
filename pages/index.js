import DataArticle from "@/components/DataArticle";
import styles from "@/styles/Home.module.css"
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Container from '@mui/material/Container';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
export default function Home() {
  return (
    <>
    <Head>
      <title>Exercise recommendation website</title>
      <meta name="keywords" content="Nack,ร้านค้า,ขายเสื้อผ้า"/>
    </Head>
      <div className={styles.container}>
        <Container maxWidth="lg">
          <h1 className={styles.title}>Welcome</h1>
          <div style={{ position: "relative", width: "100%", height: "500px" }}> 
  <Image 
    src="/welcome.jpeg"
    layout="fill"
    objectFit="cover"
    alt="logo"
  />
</div>
        </Container>
        <h1>บทความ</h1>
      </div>

      <DataArticle/>
    </>
    
  );
}
