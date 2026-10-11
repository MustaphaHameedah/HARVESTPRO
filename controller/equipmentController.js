const equipmentModel = require("../model/equipmentModel")


exports.createEquipment = async (req, res) => {
    try {

        const {
            name,
            category,
            price,
            condition,
            description,
            photos,
            longitude,
            latitude
        } = req.body

        const equipment = await equipmentModel.create({
            seller: req.user._id,
            name,
            category,
            price,
            condition,
            description,
            photos,
            location: {
                type: "Point",
                coordinates: [longitude, latitude]
            }
        })

        res.status(201).json({
            message: "Equipment listed successfully",
            equipment
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to create equipment",
            error: error.message
        })
    }
}


exports.getEquipment = async (req, res) => {
    try {

        const equipment = await equipmentModel
            .find()
            .populate("seller", "firstName")

        res.status(200).json({
            message: "Equipment retrieved successfully",
            equipment
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve equipment",
            error: error.message
        })
    }
}


exports.getSingleEquipment = async (req, res) => {
    try {

        const equipment = await equipmentModel
            .findById(req.params.id)
            .populate("seller", "firstName")

        if (!equipment) {
            return res.status(404).json({
                message: "Equipment not found"
            })
        }

        res.status(200).json({
            equipment
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve equipment",
            error: error.message
        })
    }
}


exports.updateEquipment = async (req, res) => {
    try {

        const equipment = await equipmentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!equipment) {
            return res.status(404).json({
                message: "Equipment not found"
            })
        }

        res.status(200).json({
            message: "Equipment updated successfully",
            equipment
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to update equipment",
            error: error.message
        })
    }
}