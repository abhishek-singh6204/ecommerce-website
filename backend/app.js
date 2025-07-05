require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("../backend/model/userSchema.js")
const cors = require('cors');
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const bodyParser = require("body-parser");
// const productSchema=require("./model/productSchema.js")
// const userSchema=require("./model/productSchema.js")
require("dotenv").config();
const Feature = require("./model/feature.js")
const app = express();

cloudinary.config({
    cloud_name: process.env.CLAUDINARY_CLOUD_NAME,
    api_key: process.env.CLAUDINARY_API_KEY,
    api_secret: process.env.CLAUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


const userRouter = require("./router/authRouter.js")
const productRouter = require("./router/productRouter.js");
const productSchema = require("./model/productSchema.js");
const userProductRouter = require("./router/userProductRouter.js")
const cartRouter = require("./router/cartRouter.js");
const addressRouter = require("./router/addressRouter.js");
const orderRouter = require("./router/orderRouter.js");
const adminOrderRouter = require("./router/adminOrderRouter.js");
const searchRouter = require("./router/search-router.js");
const reviewRouter = require("./router/reviewRouter.js");
const featureRouter = require("./router/featureRouter.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}));
app.use(cookieParser());

async function main() {
    return await mongoose.connect(process.env.MONGOURL);
}
main()
    .then(res => {
        console.log("connected")
    }).catch(err => {
        console.log(err);
    })

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
      if (error) {
        console.error("Cloudinary error:", error);
        reject(error);
      } else {
        resolve(result);
      }
    });
    stream.end(buffer);
  });
};

app.post("/addFeature", upload.single("feature"), async (req, res) => {
  try {
    const result = await streamUpload(req.file.buffer);

    const feature = new Feature({
      image: result.secure_url,
    });

    await feature.save();

    return res.status(200).json({
      success: true,
      message: "Feature added successfully",
    });
  } catch (err) {
    console.error("Upload or DB error:", err);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
app.post("/addProduct", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
            //   if (error) {return res.status(500).json({ success:false,message:"internal error" });}
            let newProduct = new productSchema({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                salePrice: req.body.salePrice,
                category: req.body.category,
                brand: req.body.brand,
                image: result.secure_url,
                totalStock: req.body.totalStock
            })
            newProduct.save().then(data => {
                return res.status(200).json({
                    success: true,
                    message: "product added sucessfully"
                })
            })
            //   res.json({ image: result.secure_url, ...req.body });
        }).end(req.file.buffer);
    } catch (err) {
        return res.status(500).json({ error: "Upload failed" });
    }
});
app.use("/auth", userRouter);
app.use("/product", productRouter);
app.use("/shop/product", userProductRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);
app.use("/adminOrder", adminOrderRouter);
app.use("/search", searchRouter);
app.use("/review", reviewRouter);
app.use("/feature", featureRouter);
app.put("/edit/:id", async (req, res) => {
    try {
        //  console.log("edited");
        const { id } = req.params;
        let product = await productSchema.findOne({ _id: id });
        console.log(product)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found !"
            })
        }
        else {
            console.log("product avail")
            let { title, description, price, salePrice, image, category, brand, totalStock } = req.body;
            product.title = title || product.title;
            product.description = description || product.description;
            product.price = price || product.price;
            product.salePrice = salePrice || product.salePrice;
            product.category = category || product.category;
            product.image = image || product.image;
            product.brand = brand || product.brand;
            product.totalStock = totalStock || product.totalStock;
            await product.save();
            console.log("edited");
            res.status(200).json({
                success: true,
                message: "Product edited sucessfully"
            })
        }


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
);
app.listen(3000, () => {
    console.log("server is started at port 3000");
})
