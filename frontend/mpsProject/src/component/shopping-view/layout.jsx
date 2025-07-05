import { Outlet } from "react-router";

import ShoppingHeader from "./header";
import Footer from "./footer";
export default function ShoppingLayout(){
    return(
        <div style={{display:"flex",flexDirection:"column"}}>
            <ShoppingHeader/>
            <main style={{display:"flex",flexDirection:"column",minHeight:"80vh"}} >
              <Outlet/>
            </main>
            <Footer/>
        </div>

    );
}