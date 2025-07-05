import { Outlet } from "react-router";
import Adminsidebar from "./adminsidebar";
import AdminHeader from "./header";
import { useState } from "react";
export default function AdminLayouts(){
    // const isloadig=window.innerWidth > 992;
    
    const [isopen,setIsopen]=useState(true);
    window.addEventListener("resize",()=>{
        setIsopen(window.innerWidth > 992)
    })
    const [heeight,setHeight]=useState(false);
    return(
        <div style={{minHeight:"100vh",display:"flex"}}>
            {isopen && <Adminsidebar isopen={isopen} setOpen={setIsopen}/>}
            
            <div className="w-full main">
                 {/* style={{height:heeight ? 830   : "auto", overflow:"hidden"}} */}
                <AdminHeader isopen={isopen} setOpen={setIsopen}/>
               <main >
                <Outlet context={{setHeight}}/>
               </main>
            </div>
        </div>
    );
}