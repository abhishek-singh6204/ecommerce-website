const Feature=require("../model/feature");
// const AddFeature=async (req,res)=>{
//     try{
//         console.log(req.file);
//         // const {feature}=req.body;
//         console.log('hello');
//         // const newFeature=new Feature({feature});
//         // await newFeature.save();
//         // res.status(200).json({
//         //     success:true,
//         //     data:newFeature
//         // })
//     }catch(err){
//         res.status(500).json({
//             success:false,
//             message:"Internal server error!"
//         })
//     }
// }

const getFeature=async (req,res)=>{
    try{
       const allFeature=await Feature.find({});
        res.status(200).json({
            success:true,
            data:allFeature
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server error!"
        })
    }
}

module.exports={getFeature};