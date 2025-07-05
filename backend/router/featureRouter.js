const express=require("express");
const router=express.Router();

const {getFeature}=require("../controller/featureController");


router.get("/get",getFeature);

module.exports=router;