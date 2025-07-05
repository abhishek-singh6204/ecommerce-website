const mongoose = require("mongoose");
const Schema=mongoose.Schema
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productSchema',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,

        }
    }

    ]
});

const Cart=mongoose.model("Cart",cartSchema);
module.exports=Cart;