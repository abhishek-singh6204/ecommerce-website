import  { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Margin } from "@mui/icons-material";
import { Button } from "@mui/material";

function AddressCard({addressInfo,handleDeleteAddress,handleEditAddress,handleCurrentAddress ,selectedId}){
    // console.log(selectedId,addressInfo._id)
    return(
        <Card style={{padding:"20px", gap:"10px" ,cursor:"pointer"}} onClick={()=>handleCurrentAddress(addressInfo)} className={`border-red-700 ${selectedId?._id===addressInfo?._id ? 'border-red-900 border-[3px]' : 'border-black'}`}>
            <CardContent className={`flex flex-col `} >
                <span style={{margin:"0px"}}><b>Address:</b>  {addressInfo?.address}</span>
                <span style={{margin:"0px"}}><b>City: </b> {addressInfo?.city}</span>
                <span style={{margin:"0px"}}><b>Pincode: </b> {addressInfo?.pincode}</span>
                <span style={{margin:"0px"}}><b>Phone:</b>   {addressInfo?.phone}</span>
            </CardContent>
            <CardFooter className={'flex justify-between'}>
                <Button variant="contained" onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
                <Button variant="contained" color="error" onClick={()=>handleDeleteAddress(addressInfo?._id)}>Delete</Button>
            </CardFooter>
        </Card>
    );
}
export default AddressCard;