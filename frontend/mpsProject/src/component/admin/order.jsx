import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AdminOrderDetailsview from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrderDetails, getAllOrdersAdmin, setOrderDetails } from "@/store/adminOrderSlice";
import { Badge } from "@/components/ui/badge";

function AdminOrders() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const dispatch = useDispatch();
    const { adminOrderList ,adminOrderDetails } = useSelector(state => state.adminOrder);
    useEffect(() => {
        dispatch(getAllOrdersAdmin());
    }, [dispatch,adminOrderDetails]);
    useEffect(()=>{
        if(adminOrderDetails!==null){
            setOpenDetailsDialog(true);
        }
    },[adminOrderDetails])
    console.log(adminOrderDetails);
    return (
        <Card style={{ padding: "20px" }}>
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
                    {/* <TableBody>
                        <TableRow style={{ padding: "10px !important" }}>
                            <TableCell>123456</TableCell>
                            <TableCell>12/12/2025</TableCell>
                            <TableCell>pending</TableCell>
                            <TableCell>1200</TableCell>
                            <Dialog open={openDetailsDialog} onOpenChange={() => setOpenDetailsDialog(false)}>
                                <Button variant={'outlined'} style={{ margin: "10px 0px" }} onClick={() => setOpenDetailsDialog(true)}>Details</Button>
                                <AdminOrderDetailsview />
                            </Dialog>
                        </TableRow>

                    </TableBody> */}

                    <TableBody>
                        {adminOrderList && adminOrderList.length > 0 && adminOrderList.map(order =>
                            <TableRow style={{ padding: "10px !important" }}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{order.orderDate.split('T')[0]}</TableCell>
                                <TableCell><Badge style={{ padding: "4px 7px", margin: "0px" }} className={`${order.orderStatus === 'confirmed' ? 'bg-green-600' : order.orderStatus==='rejected' ? 'bg-red-500' : 'bg-gray-400'}`}>{order.orderStatus}</Badge></TableCell>
                                <TableCell>{order.totalPrice}</TableCell>
                                <Dialog open={openDetailsDialog} onOpenChange={() =>{ setOpenDetailsDialog(false),dispatch(setOrderDetails())}}>
                                    <Button variant={'outlined'} style={{ margin: "10px 0px" }} onClick={() => dispatch(getAdminOrderDetails(order?._id))}>Details</Button>
                                    <AdminOrderDetailsview adminOrderDetails={adminOrderDetails}/>
                                </Dialog>
                            </TableRow>

                        )}


                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
export default AdminOrders