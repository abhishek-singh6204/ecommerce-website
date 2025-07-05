import { Badge } from "@/components/ui/badge";
import { DialogContent } from "@/components/ui/dialog";
import { getAdminOrderDetails, updateOrderStatus } from "@/store/adminOrderSlice";
import { Button } from "@mui/material";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
export default function AdminOrderDetailsview({ adminOrderDetails }) {
    const { user } = useSelector(state => state.auth);
    // console.log(user);
    const dispatch=useDispatch();
    // console.log(adminOrderDetails);
    const initialStatus = {
        status: ''
    }
    const [formData, setFormData] = useState(initialStatus);
    function handleChange(e) {
        setFormData({status:e.target.value});
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(updateOrderStatus({id:adminOrderDetails?._id,orderStatus:formData.status})).then((data)=>{
            console.log(data);
            if(data?.payload?.success){
                toast.success("Status updated sucessfully!")
                dispatch(getAdminOrderDetails(adminOrderDetails?._id));
                setFormData(initialStatus);
                
            }
        })
    }
    // console.log(formData);
    return (
        <DialogContent className={'sm:max-w-[600px]'} style={{ padding: "20px" }}>
            <div className="grid gap-6">
                <div className="grid gap-2" style={{ marginTop: "20px" }}>
                    <div className="flex items-center justify-between">
                        <p>Order Id</p>
                        <p>{adminOrderDetails?._id}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Order Date</p>
                        <p>{adminOrderDetails?.orderDate.split('T')[0]}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Order Status</p>
                        <p><Badge style={{ padding: "4px 7px", margin: "0px" }} className={`${adminOrderDetails?.orderStatus === 'confirmed' ? 'bg-green-600' : adminOrderDetails?.orderStatus==='rejected' ? 'bg-red-500' : 'bg-gray-400'}`}>{adminOrderDetails?.orderStatus}</Badge></p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Order Price</p>
                        <p>${adminOrderDetails?.totalPrice}</p>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label>Order Details</Label>

                    {adminOrderDetails && adminOrderDetails?.cartItems && adminOrderDetails?.cartItems.length > 0 && adminOrderDetails.cartItems.map(item =>

                        <div className="flex items-center justify-between">
                            <p>title:{item.title}</p>
                            <p>quantity:{item.quantity}</p>
                            <p>price:{item.price}</p>
                        </div>
                    )}


                </div>
                <div className="grid gap-2">
                    <Label>Shipping Info</Label>
                    <div className="flex  items-center justify-between">
                        <span style={{ margin: "0px" }}>username: {user.username}</span>

                    </div>
                    <div className="flex  items-center justify-between">
                        <span style={{ margin: "0px" }}>address:{adminOrderDetails?.addressInfo?.address}</span>

                    </div>
                    <div className="flex  items-center justify-between">
                        <span style={{ margin: "0px" }}>Pincode:{adminOrderDetails?.addressInfo?.pincode}</span>

                    </div>
                    <div className="flex items-center justify-between">
                        <span style={{ margin: "0px" }}>City: {adminOrderDetails?.addressInfo?.city}</span>

                    </div>
                    <div className="flex  items-center justify-between">
                        <span style={{ margin: "0px" }}>Phone: {adminOrderDetails?.addressInfo?.phone}</span>

                    </div>
                    <div className="flex  items-center justify-between">
                        <span style={{ margin: "0px" }}>notes: {adminOrderDetails?.addressInfo?.notes}</span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <form style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor="status">Order Status:</label>
                        <select value={formData} onChange={handleChange} id="status" style={{ padding: "7px 10px" }}>
                            <option name="order status" value={''} selected>order status</option>
                            <option name="pending" value={'pending'}>Pending</option>
                            <option name="confirmed" value={'confirmed'}>Confirmed</option>
                            <option name="inShipping" value={'inShipping'}>In Shipping</option>
                            <option name="delivered" value={'delivered'}>Delivered</option>
                            <option name="rejected" value={'rejected'}>Rejected</option>
                        </select>
                        <Button variant="contained" onClick={handleSubmit}>Update Order Status</Button>
                    </form>

                </div>
            </div>
        </DialogContent>
    );
}