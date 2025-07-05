const express=require("express");
const router=express.Router();
const {searchProducts} =require("../controller/search-controller");
router.get("/products/:keyword",searchProducts);
module.exports=router;