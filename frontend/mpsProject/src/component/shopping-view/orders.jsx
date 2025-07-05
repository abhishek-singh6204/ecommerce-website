// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ShoppingOrderDetailsview from "./orders-details";
import { Dialog } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetailsById, setOrderDetails } from "@/store/orderSlice";
import { Badge } from "@/components/ui/badge";

function ShoppingOrders(){
    const [openDetailsDialog,setOpenDetailsDialog]=useState(false);
    const dispatch=useDispatch();
    const {orderList,orderDetails}=useSelector(state=>state.order);
    const {user}=useSelector(state=>state.auth);
    function handleDetails(id){
        dispatch(getOrderDetailsById(id));
    }
    useEffect(()=>{
        dispatch(getAllOrdersByUserId(user?.id));
    },[dispatch,orderDetails])
    useEffect(()=>{
        if(orderDetails!==null){
            setOpenDetailsDialog(true);
        }
    },[orderDetails])
    console.log(orderDetails);
    return (
       <Card style={{padding:"20px"}}>
        <CardHeader>
            <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>OrderId</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Order Price</TableHead>
                        <TableHead><span className="sr-only">Details</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderList && orderList.length>0 && orderList.map(order=>
                        <TableRow style={{padding:"10px !important"}}>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{order.orderDate.split('T')[0]}</TableCell>
                        <TableCell><Badge style={{padding:"4px 7px" , margin:"0px"}} className={`${order.orderStatus==='confirmed' ? 'bg-green-600' :order.orderStatus==='rejected' ? 'bg-red-500' : 'bg-gray-400'}`}>{order.orderStatus}</Badge></TableCell>
                        <TableCell>{order.totalPrice}</TableCell>
                        <Dialog open={openDetailsDialog} onOpenChange={()=>{setOpenDetailsDialog(false), dispatch(setOrderDetails())}}>
                                <Button variant={'outlined'} style={{ margin: "10px 0px" }} onClick={()=>handleDetails(order?._id)}>Details</Button>
                                <ShoppingOrderDetailsview adminOrderDetails={orderDetails}/>
                        </Dialog>
                    </TableRow>

                    )}
                    
                   
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    );
}
export default ShoppingOrders