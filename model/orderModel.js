const mongoose = require("mongoose")

const platformConfigSchema = mongoose.Schema({

    serviceFee: {
        type: Number,
        default: 0
    }

}, { timestamps: true })


const platformConfigModel = mongoose.model(
    "PlatformConfig",
    platformConfigSchema
)

module.exports = platformConfigModel