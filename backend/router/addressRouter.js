const express=require("express");
const {addAddress,fetchAllAddress,editAddress,deleteAddress} =require("../controller/addressController")
const router=express.Router();
router.post("/add",addAddress);
router.get("/get/:userId",fetchAllAddress);
router.put("/edit/:userId/:addressId",editAddress);
router.delete("/delete/:userId/:addressid",deleteAddress);
module.exports=router;