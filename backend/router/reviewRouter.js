const express=require("express");
const router=express.Router();
const {addReview,getReview} =require("../controller/reviewController");

router.post("/add",addReview);
router.get("/:productId",getReview);

module.exports=router;
