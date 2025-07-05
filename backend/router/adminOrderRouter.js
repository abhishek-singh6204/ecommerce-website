const express=require("express");
const router=express.Router();
const {getAdminOrderDetails,getAllOrdersAdmin,updateStatus} =require("../controller/adminOrder");

router.get('/list',getAllOrdersAdmin);
router.get("/details/:id",getAdminOrderDetails);
router.put("/update/:id",updateStatus);
module.exports=router;