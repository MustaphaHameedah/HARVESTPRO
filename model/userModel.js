const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    FirstName: {type :String, required: true},
    Email: {type :String, required: true},
    Password: {type :String, required: true},
    PhoneNumber: {type :String, required: true}, 
    Gender:{ type: String, enum: ["Female", "Male"]},
    Roles: {
        type: String,
        enum: ["Admin", "Buyer","Seller", "Agent"],
        default: "Buyer"
    }
}, {timestamps: true})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel