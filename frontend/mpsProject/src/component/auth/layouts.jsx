import { Outlet } from "react-router";

export default function AuthLayouts(){
    return (
        <div style={{display:"flex",minHeight:"100vh"}}>
            <div style={{width:"50%", backgroundColor:"black", color:"white", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <h1>welcome to the ecommerce shopping</h1>
            </div>
            <div style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                <Outlet/>
            </div>
            
        </div>
    );
}