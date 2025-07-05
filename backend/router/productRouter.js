const productSchema=require("../model/productSchema.js");
const {getAllProducts,editProduct,deleteProduct,addProduct} =require("../controller/adminProduct.js");
const express=require("express");
const router=express.Router();

router.get("/allProducts",getAllProducts);
// router.post("/add",upload.single("image"),addProduct)
// router.put("/edit/:id",async (req,res)=>{
//     try{
//         //  console.log("edited");
//         const {id}=req.params;
//         let product=await productSchema.find({_id:id});
//         // console.log(product)
//         if(product.length>0){
//             return res.status(404).json({
//             success: false,
//             message: "product not found !"
//         })
//         console.log("product avail")
//         let {title,description,price,salePrice,image,category,brand,totalStock}=req.body;
//         product.title=title || product.title;
//         product.description=description || product.description;
//         product.price=price || product.price;
//         product.salePrice=salePrice || product.salePrice;
//         product.category=category || product.category;
//         product.image=image || product.image;
//         product.brand=brand || product.brand;
//         product.totalStock=totalStock || product.totalStock;
//         await product.save();
//         console.log("edited");
//         res.status(200).json({
//             success:true,
//             message:"Product edited sucessfully"
//         })
//         }
        
//     }catch(err){
//          return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         })
//     }
// }
// );
router.delete("/delete/:id",deleteProduct);
module.exports=router;