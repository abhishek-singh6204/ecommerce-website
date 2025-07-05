// import { Navigate, useLocation } from "react-router";

// function CheckAuth({isAuthenticated,user,children}){
//     const location=useLocation();
//         if(!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/signup"))){
//              sessionStorage.setItem("prevLocation", location.pathname);
//           return  <Navigate to="/auth/login" />
//         }
//         const prevLocation = sessionStorage.getItem("prevLocation");
        
//         if(isAuthenticated && (location.pathname.includes("/login") ||location.pathname.includes("/signup"))){
//             sessionStorage.removeItem("prevLocation"); 
//             if(user.role==="admin" && location.pathname.includes("/admin")){
                
//                 return <Navigate to={prevLocation}/>
//             }
//             else{
//                 return <Navigate to="/shop/home"/>
//             }
//         }
//         if(isAuthenticated && user.role!="admin" && (location.pathname.includes("/admin")) ){
//             return <Navigate to="/shop/home"/>
//         }
//          if(isAuthenticated && user.role!="user" && (location.pathname.includes("/shop"))){
//             return <Navigate to="/admin/dashboard"/>
//         }
//         return <>{children}</>

// }
import { Navigate, useLocation } from "react-router";
import { useState, useEffect } from "react";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState(null);

    // Capture previous location before redirecting to login
    useEffect(() => {
        if (!isAuthenticated && !(location.pathname?.includes("/login") || location.pathname?.includes("/signup"))) {
            setPrevLocation(location.pathname);
        }
    }, [location]);

    // Redirect after authentication
    if(location.pathname=='/'){
        if(!isAuthenticated){
            return  <Navigate to="/auth/login" />
        }
        else{
            if(prevLocation?.includes("/admin")){
                    return <Navigate to='/shop/home/'/>
                }else{
                    return <Navigate to="/admin/dashboard"/>
                }
        }
    }
      if(!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/signup"))){
//              sessionStorage.setItem("prevLocation", location.pathname);
          return  <Navigate to="/auth/login" />
        }
        // const prevLocation = sessionStorage.getItem("prevLocation");
        
        if(isAuthenticated && (location.pathname.includes("/login") ||location.pathname.includes("/signup"))){
            console.log("auth")
            // sessionStorage.removeItem("prevLocation"); 
            if(user.role==="admin" ){
                if(prevLocation?.includes("/admin")){
                    return <Navigate to={prevLocation}/>
                }else{
                    return <Navigate to="/admin/dashboard"/>
                }
                
            }
            
            // else{
            //     console.log("targeted");
            //     return <Navigate to="/shop/account"/>
            // }
           
        }
        if(isAuthenticated && (location.pathname.includes("/login") ||location.pathname.includes("/signup"))){
            console.log("auth")
            // sessionStorage.removeItem("prevLocation"); 
            if(user.role==="user" ){
                if(prevLocation?.includes("/shop")){
                    return <Navigate to={prevLocation}/>
                }else{
                    return <Navigate to="/shop/home"/>
                }
                
            }
            
            // else{
            //     console.log("targeted");
            //     return <Navigate to="/shop/account"/>
            // }
           
        }
        if(isAuthenticated && user.role!="admin" && (location.pathname.includes("/admin")) ){
            return <Navigate to="/shop/home"/>
        }
         if(isAuthenticated && user.role!="user" && (location.pathname.includes("/shop"))){
            return <Navigate to="/admin/dashboard"/>
        }

    return <>{children}</>;
}
export default CheckAuth;
