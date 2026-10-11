exports.allowRoles = (...roles) => {
    return (req, res, next) => {

        if (!req.user || !roles.includes(req.user.Roles)) {
            return res.status(403).json({
                message: "You are not authorized to access this feature"
            })
        }

        next()
    }
}