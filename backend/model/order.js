const mongoose=require("mongoose");

const OrderSchema=new mongoose.Schema({
    userId:String,
    cartId:String,
    cartItems:[
        {
            productId:String,
            title:String,
            image:String,
            price:String,
            quantity:Number
        }
    ],
    addressInfo:{
        address:String,
        addressId:String,
        pincode:String,
        city:String,
        phone:String,
        notes:String
    },
    orderStatus:String,
    paymentMethod:String,
    paymentStatus:String,
    totalPrice:Number,
    orderDate:Date,
    orderUpdateDate:Date,
    
});
const Order=mongoose.model("Order",OrderSchema);
module.exports=Order;