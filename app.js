require("dotenv").config()
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")
const express = require("express")
const cors = require("cors")
const PORT = process.env.PORT
const app = express()
const db = require("./config/db")
const userRouter = require("./Routes/userRouter")
const equipmentRouter = require("./Routes/equipmentRouter")
const orderRouter = require("./Routes/orderRouter")
const categoryRouter = require("./Routes/categoryRouter")



app.use(cors())
app.use(express.json())

app.get("/api-docs.json", (req, res) => {
    res.json(swaggerSpec)
})

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
)

app.use("/api/users", userRouter)
app.use("/api/equipment", equipmentRouter)
app.use("/api/orders", orderRouter)
app.use("/api/categories", categoryRouter)



db()

app.listen(PORT, "0.0.0.0" , (error)=>{
    if (error) {
        console.log(`App is failing to run on port: ${PORT}`);
        
    } else {
        console.log(`App is running on port: ${PORT}`);
        console.log(`Swagger is running on http://localhost:${PORT}/api-docs`);
    }
}) 