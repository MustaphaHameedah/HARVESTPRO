const mongoose = require("mongoose")
const dns = require("dns")

dns.setServers(["8.8.8.8"])

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Unable to connect to database")
        console.log(error.message)
    }
}

module.exports = db