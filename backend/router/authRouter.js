const express=require("express");
const router=express.Router();
const {signup, logout, authMiddleware}=require("../controller/user.js");
const {Login}=require("../controller/user.js")


router.post("/signup",signup);
router.post("/login",Login);
router.post("/logout",logout);
router.get("/check-auth",authMiddleware,(req,res)=>{
    let user=req.user;
    res.status(200).json({
        success:true,
        message:"authenticated user",
        user
    })
})
module.exports=router;