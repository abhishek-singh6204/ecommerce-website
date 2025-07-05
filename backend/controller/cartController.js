const express = require("express");
const router = express.Router();
const User = require("../model/userSchema.js");
const productSchema = require("../model/productSchema.js");
const Cart = require("../model/cart.js");

const addCartItems = async (req, res) => {
    try {
        let { userId, quantity, productId } = req.body;
        // console.log(userId, productId, quantity);
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided !"
            })
        }
        const product = await productSchema.findById(productId);
        // console.log(product);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not exixts !"
            })
        }
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // console.log(cart);
            cart = new Cart({
                userId, items: [],

            });
            // console.log(cart, "cart");
        }

        const findCurrentProductId = cart.items.findIndex(item => item.productId.toString() === productId);
        // console.log(findCurrentProductId);
        if (findCurrentProductId === -1) {
            // console.log("product present in cart");
            cart.items.push({ productId, quantity });
        } else {
            // console.log("product notpresent in cart");
            cart.items[findCurrentProductId].quantity += quantity;
        }
        await cart.save();
        return res.status(200).json({
            success: true,
            data: cart
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "product not found !"
        })
    }
}

const deleteCartItems = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        // console.log(productId);
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided !"
            })
        }
        // const CartItem = await Cart.findOne({ userId }).populate({ path: "items.productId", select: "title description price salePrice image " });
        const cart = await Cart.findOne({ userId }).populate({ path: "items.productId", select: "title description price salePrice image brand category " });
        // console.log(cart);
        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "Cart not found !"
            })
        }

        // const result = await Cart.updateOne(
        //     { _id: userId },
        //     { $pull: { items: { _id: productId } } }
        // );
        // console.log("Item removed:", result);


        // const car = await Cart.findOne({ userId })
        cart.items = cart.items.filter(item => item?.productId?._id.toString() !== productId);
        // cart.items.map((ca)=>console.log(ca.productId._id));
        // console.log(productId);
        await cart.save();
        await cart.populate({ path: "items.productId", select: "title description price salePrice image brand category" });
        const populatedItems=cart.items.map((item)=>({
            productId: item.productId ? item.productId._id : null,
            title: item.productId ? item.productId.title : null,
            description: item.productId ? item.productId.description : null,
            price:item.productId ? item.productId.price : null,
            salePrice:item.productId ? item.productId.salePrice: null,
            image:item.productId ? item.productId.image: null,
        }))
        // console.log(populatedItems);
        // console.log("deleted", cart)
        const carts = await Cart.findOne({ userId }).populate({ path: "items.productId", select: "title description price salePrice image brand" });
        console.log(carts);
        return res.status(200).json({
            success: true,
            data: {
                carts
            },
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "product not found !"
        })
    }
}

const editCartItems = async (req, res) => {
    try {
        let { userId, quantity, productId } = req.body;
        // console.log(userId,productId,quantity);
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided !"
            })
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "Cart not found !"
            })
        }
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Cart item not present!"
            })
        }
        cart.items[productIndex].quantity = quantity;
        await cart.save();
        // const CartItem=await Cart.find().populate("User","username email").populate({path:"productSchema",select:"title description price salePrice image brand category"});
        const carts = await Cart.findOne({ userId }).populate({ path: "items.productId", select: "title description price salePrice image brand" });
        // console.log(carts);
        return res.status(200).json({
            success: true,
            data:{
                carts
            }
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "product not found !"
        })
    }
}

const getCartItems = async (req, res) => {
    try {
        let { userId } = req.params;
        // let userid = ObjectId(`${userId}`);
        // console.log(userid);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is not given !"
            })
        }
        const CartItem = await Cart.findOne({ userId }).populate({ path: "items.productId", select: "title description price salePrice image " });
        if (!CartItem) {
            return res.status(400).json({
                success: false,
                message: "Cart not found !"
            })
        }
        // console.log(CartItem);
        return res.status(200).json({
            success: true,
            data: CartItem
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Cart not found !"
        })
    }
}

module.exports = { addCartItems, deleteCartItems, editCartItems, getCartItems }
