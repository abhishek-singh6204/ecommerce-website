import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from "@/store/addressSlice";
import { Button, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./addressCard";
import toast from 'react-hot-toast';
function Address({handleCurrentAddress,selectedId}) {

    const initialFormData = {
        userId: '',
        address: '',
        pincode: '',
        city: '',
        phone: '',
        notes: ''
    }
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { addressList } = useSelector(state => state.address);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    function isValid() {
        return Object.keys(formData).map((key) => formData[key] !== "").every((item) => item)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents default form submission behavior
        if(addressList.length>=3 && currentEditedId===null){
            toast.error("You can add maximum three addresses");
            setFormData(initialFormData);
            return ;
        }
        {currentEditedId ? 
            dispatch(editAddress({userId:user?.id,addressId:currentEditedId,formData})).then((data)=>{
                console.log(data);
                if(data?.payload?.success){
                    dispatch(fetchAllAddress(user?.id));
                    setFormData(initialFormData);
                    setCurrentEditedId(null);
                    toast.success("Address Edited Sucessfully!")
                }
            })
       : 
       dispatch(addNewAddress({
            ...formData,
            userId: user?.id
        })).then((data) => {
            console.log(data);
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id));
                setFormData(initialFormData);
                toast.success("Address Added Sucessfully!")
            }
        })
    }
    };
    function handleDeleteAddress(id) {
        console.log(id);
        dispatch(deleteAddress({ userId: user?.id, addressId: id })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id));
                toast.success("Address deleted Sucessfully!")
            }
        })

    }
    function handleEditAddress(addressInfo) {
        console.log(addressInfo);
        setCurrentEditedId(addressInfo?._id);
        setFormData({
            ...formData,
            userId:addressInfo?.userId ,
            address: addressInfo?.address,
            pincode: addressInfo?.pincode,
            city: addressInfo?.city,
            phone: addressInfo?.phone,
            notes: addressInfo?.notes
        })
    }
    useEffect(() => {
        dispatch(fetchAllAddress(user?.id));
    }, [dispatch]);
    console.log(currentEditedId);
    return (
        <Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5" style={{ padding: "20px" }}>
                {
                    addressList && addressList.length > 0 && addressList.map((item) => <AddressCard selectedId={selectedId} addressInfo={item} handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress} handleCurrentAddress={handleCurrentAddress}/>)
                }
            </div>
            <CardHeader>
                <CardTitle className={'text-center text-xl'}>
                    {currentEditedId ? 'Edit Address' : 'Add new Address'} 
                </CardTitle>
            </CardHeader>
            <CardContent style={{ padding: "20px" }}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="userId">UserId</label>
                    <input type="text" name="userId" id="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} required />
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                    <label htmlFor="pincode">pincode</label>
                    <input type="text" name="pincode" id="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
                    <label htmlFor="city">city</label>
                    <input type="text" name="city" id="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                    <label htmlFor="phone">phone</label>
                    <input type="text" name="phone" id="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                    <label htmlFor="Notes">Notes</label>
                    <textarea name="notes" id="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} style={{ width: "100%", height: "70px", padding: "20px", marginBottom: "20px" }} className="border rounded-sm" required></textarea>

                    <Button type="submit" variant="contained" disabled={!isValid()} className="w-full">{currentEditedId ? 'Edit' : 'Submit'}</Button>
                </form>
            </CardContent>
        </Card>

    );
}


export default Address