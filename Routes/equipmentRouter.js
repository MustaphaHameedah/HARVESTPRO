const express = require("express")
const router = express.Router()

const equipmentController = require("../controller/equipmentController")
const { protect } = require("../middleware/authMiddleware")
const { allowRoles } = require("../middleware/roleMiddleware")


/**
 * @swagger
 * /api/equipment:
 *   post:
 *     summary: Create a new equipment listing
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *               - condition
 *               - description
 *               - longitude
 *               - latitude
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tractor
 *               category:
 *                 type: string
 *                 example: Farming Machinery
 *               price:
 *                 type: number
 *                 example: 2500000
 *               condition:
 *                 type: string
 *                 enum: [New, Used]
 *                 example: Used
 *               description:
 *                 type: string
 *                 example: Well-maintained tractor suitable for large farms
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "tractor.jpg"
 *               longitude:
 *                 type: number
 *                 example: 3.3792
 *               latitude:
 *                 type: number
 *                 example: 6.5244
 *     responses:
 *       201:
 *         description: Equipment listed successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 */
router.post(
    "/",
    protect,
    allowRoles("Seller", "Agent", "Admin"),
    equipmentController.createEquipment
)


/**
 * @swagger
 * /api/equipment:
 *   get:
 *     summary: Get all equipment
 *     tags: [Equipment]
 *     responses:
 *       200:
 *         description: Equipment retrieved successfully
 */
router.get("/", equipmentController.getEquipment)


/**
 * @swagger
 * /api/equipment/{id}:
 *   get:
 *     summary: Get a single equipment listing
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 66f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Equipment retrieved successfully
 *       404:
 *         description: Equipment not found
 */
router.get("/:id", equipmentController.getSingleEquipment)


/**
 * @swagger
 * /api/equipment/{id}:
 *   patch:
 *     summary: Update an equipment listing
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 66f123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tractor
 *               category:
 *                 type: string
 *                 example: Farming Machinery
 *               price:
 *                 type: number
 *                 example: 2500000
 *               condition:
 *                 type: string
 *                 enum: [New, Used]
 *                 example: Used
 *               description:
 *                 type: string
 *                 example: Well-maintained tractor
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Equipment updated successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Equipment not found
 */
router.patch(
    "/:id",
    protect,
    allowRoles("Seller", "Agent", "Admin"),
    equipmentController.updateEquipment
)

module.exports = router