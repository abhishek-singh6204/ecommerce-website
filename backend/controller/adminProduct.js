const express=require("express");
const productSchema=require("../model/productSchema.js");

// const addProduct=async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
//       if (error) return res.status(500).json({ error });
//       res.json({ image: result.secure_url, ...req.body });
//     }).end(req.file.buffer);
//   } catch (err) {
//     res.status(500).json({ error: "Upload failed" });
//   }
// };

const getAllProducts=async (req,res)=>{
    try{
        const allProducts=await productSchema.find({});
        // console.log(allProducts,"main")
         return res.status(200).json({
            success: true,
            data: allProducts
        })
    }catch(err){
         return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const editProduct=async (req,res)=>{
    try{
         console.log("edited");
        const {id}=req.params;
        let product=await productSchema.find({_id:id});
        if(product.length===0){
            return res.status(404).json({
            success: false,
            message: "product not found !"
        })
        let {title,description,price,salePrice,image,category,brand,totalStock}=req.body;
        product.title=title || product.title;
        product.description=description || product.description;
        product.price=price || product.price;
        product.salePrice=salePrice || product.salePrice;
        product.category=category || product.category;
        product.image=image || product.image;
        product.brand=brand || product.brand;
        product.totalStock=totalStock || product.totalStock;
        await product.save();
       
        res.status(200).json({
            success:true,
            message:"Product edited sucessfully"
        })
        }
        
    }catch(err){
         return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const deleteProduct=async (req,res)=>{
    try{
         const {id}=req.params;
         console.log(id);
        let product=await productSchema.findByIdAndDelete({_id:id});
        if(!product){
            return res.status(404).json({
            success: false,
            message: "product not found !"
        })}else{
        console.log(product);
        return res.status(200).json({
            success: true,
            message:"Product deleted sucessfully"
        })
    }
    
    }catch(err){
         return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports={getAllProducts,editProduct,deleteProduct}