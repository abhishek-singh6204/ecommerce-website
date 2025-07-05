const mongoose=require("mongoose");
const pSchema=mongoose.Schema({
    title:String,
    description:String,
    image:String,
    category:String,
    brand:String,
    price:Number,
    salePrice:Number,
    totalStock:Number
})

const productSchema=mongoose.model("productSchema",pSchema);
module.exports=productSchema;