const userModel = require("../model/userModel")


exports.readUsers = async (req, res) => {
    try {
        const users = await userModel
            .find()
            .select("-Password")

        res.status(200).json({
            message: "All users retrieved successfully",
            users: {
                count: users.length,
                data: users
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve users",
            error: error.message
        })
    }
}


exports.getUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await userModel
            .findById(id)
            .select("-Password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve user",
            error: error.message
        })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await userModel
            .findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )
            .select("-Password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User details updated successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to update user",
            error: error.message
        })
    }
}