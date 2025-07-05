const mongoose=require("mongoose");
const reviewSchema=mongoose.Schema({
    productId:String,
    userId:String,
    userName:String,
    reviewMessage:String,
    reviewValue:Number
})

const review=mongoose.model("review",reviewSchema);
module.exports=review;