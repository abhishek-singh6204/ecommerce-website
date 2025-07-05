import { Badge } from "@/components/ui/badge";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ShoppingOrderDetailsview({adminOrderDetails}) {
    const initialStatus = {
        status: ''
    }
    const {user}=useSelector(state=>state.auth);
    const [formData, setFormData] = useState(initialStatus);
    function handleChange(e) {
        setFormData(e.target.value);

    }
    console.log(formData);
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
                        <p><Badge style={{ padding: "4px 7px", margin: "0px" }} className={`${adminOrderDetails?.orderStatus === 'confirmed' ? 'bg-green-600' : adminOrderDetails?.orderStatus==='rejected' ? 'bg-red-500' :  'bg-gray-400'}`}>{adminOrderDetails?.orderStatus}</Badge></p>
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

            </div>
        </DialogContent>
    );
}