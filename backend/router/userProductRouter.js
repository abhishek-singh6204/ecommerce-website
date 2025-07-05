const {fetchFilteredProducts,getProductDetailed} =require('../controller/productController.js')
const express=require("express");
const router=express.Router();

router.get("/allProducts",fetchFilteredProducts)
router.get("/getDetailed/:id",getProductDetailed);
module.exports=router