const express=require("express");
const router=express.Router();
const {addCartItems,deleteCartItems,editCartItems,getCartItems} =require('../controller/cartController.js')
router.get("/get/:userId",getCartItems);
router.post("/add",addCartItems);
router.put("/edit",editCartItems);
router.delete("/delete/:userId/:productId",deleteCartItems)

module.exports=router