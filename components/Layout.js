import Navbar from "./Navbar"
import Footer from "./Footer"


export default function Layuot({children}){
    return(
        <div>
            <Navbar/>
                {children}
                       
            <Footer/>
        </div>
    )
}