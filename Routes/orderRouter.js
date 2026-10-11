const express = require("express")
const router = express.Router()

const orderController = require("../controller/orderController")
const { protect } = require("../middleware/authMiddleware")


/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create an order for equipment
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - equipment
 *             properties:
 *               equipment:
 *                 type: string
 *                 example: 66f123456789abcdef123456
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Equipment not found
 */
router.post(
    "/",
    protect,
    orderController.createOrder
)


/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get(
    "/",
    protect,
    orderController.getOrders
)


/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a single order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 66f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Order not found
 */
router.get(
    "/:id",
    protect,
    orderController.getSingleOrder
)

module.exports = router