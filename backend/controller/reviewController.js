const review=require("../model/reviewSchema");
const Order=require('../model/order');
const productSchema=require("../model/productSchema");

const addReview=async (req,res)=>{
    try{
        const {productId,userId,userName,reviewMessage,reviewValue}=req.body;
        // console.log(req.body);
        const order=await Order.findOne({
            userId,'cartItems.productId':productId,orderStatus:'confirmed'
        });
        // console.log(order);
        if(!order){
          return  res.status(400).json({
                success:false,
                message:"You need to purchase this product to reviewed it!"
            })
        }
        const isReviewed=await review.findOne({userId,productId});
        if(isReviewed){
            return  res.status(400).json({
                success:false,
                message:"You already reviewed this product !"
            })
        } 

        const newReview=new review({
            productId,userId,userName,reviewMessage,reviewValue
        })
        await newReview.save();
        const reviews=await review.find({productId});
        const reviewLength=reviews.length;
        const avgReviewRating=reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue)/reviewLength;
        await productSchema.findByIdAndUpdate(productId,{avgReviewRating});
        res.status(200).json({
            success:true,
            data:newReview
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server error!"
        })
    }
}

const getReview=async(req,res)=>{
    try{
        const {productId} =req.params;
        // console.log(productId);
        const reviews=await review.find({productId});
        // console.log(reviews);
        res.status(200).json({
            success:true,
            data:reviews
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server error!"
        })
    }
}
module.exports={addReview,getReview};