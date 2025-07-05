const paypal = require("../helpers/paypal.js");
const Order = require('../model/order');
const Cart = require("../model/cart.js");
const productSchema=require("../model/productSchema.js")
const mongoose = require("mongoose");
const createOrder = async (req, res) => {
    try {
        const { userId, cartId, cartItems, addressInfo, orderStatus,
            paymentMethod,
            paymentStatus,
            totalPrice,
            orderDate,
            orderUpdateDate,
        } = req.body;
        // console.log(req.body);
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',

            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
                cancel_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`,
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalPrice.toFixed(2)
                    },
                    description: 'description'
                },
            ]
        };
        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Error while creating payment"
                })
            }
            else {
                const newOrder = new Order({
                    userId, cartId, cartItems, addressInfo, orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalPrice,
                    orderDate,
                    orderUpdateDate,

                })
                await newOrder.save();
                console.log(paymentInfo);
                const approvalURl = paymentInfo.links.find(link => link.rel === 'approval_url').href;
                console.log(approvalURl);
                res.status(201).json({
                    success: true,
                    approvalURl,
                    orderId: newOrder._id
                })
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Some error occured Whiile payment!"
        })
    }
}
const capturePayment = async (req, res) => {

    try {
        const { orderId } = req.body;
        console.log(orderId, 'aaaaa');
        const order = await Order.findById(orderId);
        console.log(order);
        if (!order) {
            return res.status(500).json({
                success: false,
                message: "Order not exists!"
            })
        }
        // order.paymentId = paymentId;
        // order.payerId = payerId;
        order.orderStatus = "confirmed",
            order.paymentStatus = 'paid'
        const cartId = order.userId;
        for(let item of order.cartItems){
            const product=await productSchema.findById(item.productId);
            if(!product){
              return  res.status(400).json({
                    success:false,
                    message:`not enough quantity for this product ${product.title}`
                })
            }
            product.totalStock-=item.quantity;
            await product.save();
        }
        console.log(cartId);
        const deletedCart = await Cart.findByIdAndDelete(cartId);
        await Cart.deleteOne({ userId: cartId })
        // console.log(deletedCart);
        await order.save();
        res.status(500).json({
            success: true,
            message: "Order confirmed!",
            data: order
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const order = await Order.find({ userId: userId });
        if (!order.length) {
            return res.status(404).json({
                success: false,
                message: "no order found!"
            })
        }
        res.status(200).json({
            success: true,
            data: order
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error!"
        })
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "no order found!"
            })
        }
        res.status(200).json({
            success: true,
            data: order
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error!"
        })
    }
}

module.exports = { createOrder, capturePayment,getAllOrders,getOrderDetails };