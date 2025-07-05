const productSchema = require("../model/productSchema");
const searchProducts = async (req, res) => {
    try {
        const keyword = req.params.keyword?.trim();
        if (!keyword) {
            return res.status(400).json({ success:false,message:"keyword not exists!"});
        }
        

        const regEx = new RegExp(keyword, 'i'); // 'i' for case-insensitive
        const createSearchQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx }
            ]
        };
        console.log(createSearchQuery);
        // Now run the query
        const products = await productSchema.find( createSearchQuery );
        console.log(products);
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = { searchProducts };