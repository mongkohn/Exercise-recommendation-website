import Link from "next/link"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import styles from "@/styles/Home.module.css"


export default function DataArticle() {
  return (
    <>
      <div>
      <Link href="#" >
          <Card sx={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image="/article.jpeg"
              alt="green iguana"
            />
            <CardContent>
              <h1 >
                บทความ
              </h1>
              <p className={styles.art} >
              เวลาอยากที่จะมีรูปร่างที่ดีขึ้น มักจะลงมือทำด้วยวิธีที่เครียดเกินไป 
              เข้มงวดเกินไป เช่น การกินคลีน กินอกไก่ผัดน้ำข้าวกล้องการชั่งตวงวัดหรือ
              การนับแคลอรี่แบบเคร่งเครียด ซึ่งสิ่งเหล่านี้ทำให้ล้มเลิกการทำได้ง่าย
              </p>
            </CardContent>
          </CardActionArea>
        </Card>
        </Link>
      </div>

      <div>
      <Link href="#">
          <Card sx={{ maxWidth: 500 }}>
          <CardActionArea className= {styles.card}>
            <CardMedia 
              component="img"
              height="200"
              image="/article.jpeg"
              alt="green iguana"
            />
            <CardContent>
              <h1>
                บทความ
              </h1>
              <p className={styles.art} >
              เวลาอยากที่จะมีรูปร่างที่ดีขึ้น มักจะลงมือทำด้วยวิธีที่เครียดเกินไป 
              เข้มงวดเกินไป เช่น การกินคลีน กินอกไก่ผัดน้ำข้าวกล้องการชั่งตวงวัดหรือ
              การนับแคลอรี่แบบเคร่งเครียด ซึ่งสิ่งเหล่านี้ทำให้ล้มเลิกการทำได้ง่าย
              </p>
            </CardContent>
          </CardActionArea>
        </Card>
        </Link>
      </div>
    </>
  )
}
