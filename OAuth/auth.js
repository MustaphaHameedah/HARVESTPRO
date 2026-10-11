const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.register = async (req, res) => {
    try {
        const body = Object.fromEntries(
            Object.entries(req.body || {}).map(([key, value]) => [key.toLowerCase(), value])
        )
        const FirstName = body.firstname
        const Email = body.email
        const Password = body.password
        const PhoneNumber = body.phonenumber
        const Gender = body.gender

        if (!FirstName || !Email || !Password || !PhoneNumber || !Gender) {
            const missingFields = Object.entries({ FirstName, Email, Password, PhoneNumber, Gender })
                .filter(([, value]) => !value)
                .map(([field]) => field)

            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(", ")}`,
                missingFields
            })
        }

        const existingUser = await userModel.findOne({ Email })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(Password, 10)

        const newUser = await userModel.create({
            FirstName,
            Email,
            Password: hashedPassword,
            PhoneNumber,
            Gender
        })

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: newUser._id,
                FirstName: newUser.FirstName,
                Email: newUser.Email,
                PhoneNumber: newUser.PhoneNumber,
                Gender: newUser.Gender,
                Roles: newUser.Roles
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message,
            
        })
        console.log(error)
    }
}


exports.login = async (req, res) => {
    try {
        const body = Object.fromEntries(
            Object.entries(req.body || {}).map(([key, value]) => [key.toLowerCase(), value])
        )

        const Email = body.email
        const Password = body.password

        if (!Email || !Password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        const user = await userModel.findOne({ Email })

        if (!user) {
            return res.status(404).json({
                message: "User does not exist"
            })
        }

        const checkPassword = await bcrypt.compare(
            Password,
            user.Password
        )

        if (!checkPassword) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.Roles
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                FirstName: user.FirstName,
                Email: user.Email,
                Roles: user.Roles
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        })
    }
}

    // exports.login = async(req, res) => {
    // const {email, password} = req.body
    // if (!email || !password) {
    //     return res.status(400).json({message: "Email and password are required"})
    // }

    // const user = await userModel.findOne({email})
    // if (!user) {
    //     res.status(404).json({message:"User does not exist"})
    // }

    // const checkPassword = await bcrypt.compare(password, user.password)
    // if(!checkPassword){
    //     return res.status(400).json({message: "Invalid credentials"})
    // }

    // res.status(200).json({message: "Login successful"})
    // }
 

