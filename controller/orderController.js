const orderModel = require("../model/orderModel")
const equipmentModel = require("../model/equipmentModel")


exports.createOrder = async (req, res) => {
    try {

        const { equipment, quantity } = req.body

        if (!equipment) {
            return res.status(400).json({
                message: "Equipment is required"
            })
        }

        const equipmentItem = await equipmentModel.findById(equipment)

        if (!equipmentItem) {
            return res.status(404).json({
                message: "Equipment not found"
            })
        }

        const order = await orderModel.create({
            farmer: req.user._id,
            equipment: equipmentItem._id,
            seller: equipmentItem.seller,
            quantity: quantity || 1
        })

        res.status(201).json({
            message: "Order created successfully",
            order
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to create order",
            error: error.message
        })
    }
}


exports.getOrders = async (req, res) => {
    try {

        const orders = await orderModel
            .find()
            .populate("farmer", "firstName Email")
            .populate("seller", "firstName Email")
            .populate("equipment")

        res.status(200).json({
            message: "Orders retrieved successfully",
            orders
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve orders",
            error: error.message
        })
    }
}


exports.getSingleOrder = async (req, res) => {
    try {

        const order = await orderModel
            .findById(req.params.id)
            .populate("farmer", "firstName Email")
            .populate("seller", "firstName Email")
            .populate("equipment")

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }

        res.status(200).json({
            message: "Order retrieved successfully",
            order
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve order",
            error: error.message
        })
    }
}