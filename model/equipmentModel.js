const mongoose = require("mongoose")

const equipmentSchema = mongoose.Schema({

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    condition: {
        type: String,
        enum: ["New", "Used"],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    photos: [{
        type: String
    }],

    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },

        coordinates: {
            type: [Number],
            required: true
        }
    },

    availability: {
        type: Boolean,
        default: true
    },

    rating: {
        type: Number,
        default: 0
    }

}, { timestamps: true })


equipmentSchema.index({
    location: "2dsphere"
})


const equipmentModel = mongoose.model(
    "Equipment",
    equipmentSchema
)

module.exports = equipmentModel