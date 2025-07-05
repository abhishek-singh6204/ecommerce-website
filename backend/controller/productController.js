const productSchema = require("../model/productSchema");
const fetchFilteredProducts = async (req, res) => {
    try {
        // console.log("fetching");
        const {category=[],brand=[],sortBy="priceHightolow"}=req.query;
        // console.log(category);
        // console.log(brand);
        let filters={}; 
        if(category.length){
            filters.category={$in: category.split(",")}
        }
        if(brand.length){
            filters.brand={$in: brand.split(",")}
        }
        let sort={}
        switch(sortBy){
            case "priceLowtoHigh":
                sort.price=1;
                break;
            case "priceHightolow":
                sort.price=1;
                break;
            case "sortZtoA":
                sort.price=-1;
                break;
            case "sortAtoZ":
                sort.title=1;
                break;
            default:
                sort.price=1
        }
        // console.log("filter route",filters);
        let filteredProducts=await productSchema.find(filters).sort(sort);
        return res.status(200).json({
            success: true,
            data: filteredProducts
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
const getProductDetailed=async(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    const  product=await productSchema.findById(id);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"product not found!"
        })
    }
    else{
        res.status(200).json({
            success:true,
            data:product
        })
    }
}
module.exports={fetchFilteredProducts,getProductDetailed};