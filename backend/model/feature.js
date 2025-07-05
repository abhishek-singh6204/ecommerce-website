const mongoose=require("mongoose");

const FeatureSchema=new mongoose.Schema({
    image:String
});

module.exports=mongoose.model("Feature",FeatureSchema);