const userController = require("../controller/userController")
const { register, login } = require("../OAuth/auth")
const express = require("express")

const router = express.Router()

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - FirstName
 *               - Email
 *               - Password
 *               - PhoneNumber
 *               - Gender
 *             properties:
 *               FirstName:
 *                 type: string
 *                 example: Hameedah Mustapha
 *               Email:
 *                 type: string
 *                 example: example@gmail.com
 *               Password:
 *                 type: string
 *                 example: 12345
 *               PhoneNumber:
 *                 type: string
 *                 example: 09127033672
 *               Gender:
 *                 type: string
 *                 enum: [Female, Male]
 *                 example: Female
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Missing required fields or email already exists
 */
router.post("/register", register)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - Password
 *             properties:
 *               Email:
 *                 type: string
 *                 example: example@gmail.com
 *               Password:
 *                 type: string
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User does not exist
 */
router.post("/login", login)

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All users retrieved successfully
 */
router.get("/", userController.readUsers)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6ac013fde6c42a81df184d36
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 */
router.get("/:id", userController.getUser)

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6ac013fde6c42a81df184d36
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *                 example: Hameedah Mustapha
 *               PhoneNumber:
 *                 type: string
 *                 example: 08012345678
 *               Gender:
 *                 type: string
 *                 enum: [Female, Male]
 *                 example: Female
 *     responses:
 *       200:
 *         description: User details updated successfully
 *       404:
 *         description: User not found
 */
router.patch("/:id", userController.updateUser)

module.exports = router