const Order = require("../model/order");
const getAllOrdersAdmin = async (req, res) => {
    try {
        const Allorders = await Order.find();
        if (Allorders.length <= 0) {
            return res.status(404).json({
                success: true,
                message: "No order found!"
            })
        }
        res.status(201).json({
            success: true,
            data: Allorders
        })
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Internal server error!"
        })
    }
}


const getAdminOrderDetails = async (req, res) => {
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

const updateStatus = async (req, res) => {
    try {
        let { id } = req.params;
        let { orderStatus } = req.body;
        console.log(id,orderStatus);
        let order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No order found!"
            })
        }

        await Order.findByIdAndUpdate(id, { orderStatus });
        // console.log(res);
        res.status(200).json({
            success: true,
            message: "status updated sucessfully!"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error!"
        })
    }
}
module.exports = { getAdminOrderDetails, getAllOrdersAdmin,updateStatus }