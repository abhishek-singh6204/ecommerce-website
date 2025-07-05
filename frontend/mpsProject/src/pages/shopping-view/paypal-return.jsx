import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router";

import { useEffect } from "react";
import { captureOrder } from "@/store/orderSlice";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function PaypalReturn(){
    //     const { approvalURL,isLoading, } = useSelector(state => state.order);

    const dispatch=useDispatch();
    // const location=useLocation();
    // const params=new URLSearchParams(location.search);
    // const paymentId=params.get("paymentId");
    // const payerId=params.get("PayerID");
    const orderId=JSON.parse(sessionStorage.getItem('currentOrderId'));
    useEffect(()=>{
        console.log(orderId,'hello');
        dispatch(captureOrder(orderId)).then((data)=>{
            console.log(data);
        })
    },[])
    // console.log(approvalURL,isLoading);
    return (
        <div className="flex flex-col justify-center items-center" style={{minHeight:"80vh"}}>
            <img src="https://cashfreelogo.cashfree.com/website/landings/instant-settlements/payment-done.png" alt="payment sucessfully image" style={{maxWidth:"400px",alignSelf:"center"}} className="border-lg shadow-md border-rounded"/>

            <div className="btnGroup flex gap-5" style={{marginTop:"20px"}}>
                <Button className={'navigateOrder'}><Link to={"/shop/account"}>See Orders</Link></Button>
                <Button className={'navigateOrder'}><Link to={"/shop/home"}>Go to home</Link></Button>
            </div>
        </div>
    );
}