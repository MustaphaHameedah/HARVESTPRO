const express = require("express")

const router = express.Router()

const categoryController = require("../controller/categoryController")

const { protect } = require("../middleware/authMiddleware")
const { allowRoles } = require("../middleware/roleMiddleware")


router.post(
    "/",
    protect,
    allowRoles("Admin", "Agent"),
    categoryController.createCategory
)


router.get(
    "/",
    categoryController.getCategories
)


router.get(
    "/:id",
    categoryController.getSingleCategory
)


router.patch(
    "/:id",
    protect,
    allowRoles("Admin", "Agent"),
    categoryController.updateCategory
)


router.delete(
    "/:id",
    protect,
    allowRoles("Admin", "Agent"),
    categoryController.deleteCategory
)


module.exports = router