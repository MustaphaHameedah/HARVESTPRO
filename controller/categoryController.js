const categoryModel = require("../model/categoryModel")


exports.createCategory = async (req, res) => {
    try {

        const { name, description } = req.body

        if (!name) {
            return res.status(400).json({
                message: "Category name is required"
            })
        }

        const existingCategory = await categoryModel.findOne({ name })

        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists"
            })
        }

        const category = await categoryModel.create({
            name,
            description
        })

        res.status(201).json({
            message: "Category created successfully",
            category
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to create category",
            error: error.message
        })
    }
}


exports.getCategories = async (req, res) => {
    try {

        const categories = await categoryModel.find()

        res.status(200).json({
            message: "Categories retrieved successfully",
            categories
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve categories",
            error: error.message
        })
    }
}


exports.getSingleCategory = async (req, res) => {
    try {

        const category = await categoryModel.findById(req.params.id)

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        res.status(200).json({
            message: "Category retrieved successfully",
            category
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve category",
            error: error.message
        })
    }
}


exports.updateCategory = async (req, res) => {
    try {

        const { name, description } = req.body

        const category = await categoryModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        res.status(200).json({
            message: "Category updated successfully",
            category
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to update category",
            error: error.message
        })
    }
}


exports.deleteCategory = async (req, res) => {
    try {

        const category = await categoryModel.findByIdAndDelete(
            req.params.id
        )

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        res.status(200).json({
            message: "Category deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to delete category",
            error: error.message
        })
    }
}