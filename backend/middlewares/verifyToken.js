const jwt = require("jsonwebtoken")

// Verify Token
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    if (authToken) {
        const token = authToken.split(" ")[1]
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decodedPayload
            next()
        } catch (error) {
            return res.status(401).json({ message: "invalid, access denied" })

        }
    }else {
        return res.status(401).json({ message: "no token provided, access denied" })
    }
}

// Verify Token & Admin
function verifyTokenAndOnlyUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next()
        }else {
            return res.status(403).json({msg: "not allowed, only user himself"})
        }
    })
}

// Verify Token & Only User Himself
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }else {
            return res.status(403).json({msg: "not allowed, only admin"})
        }
    })
}

module.exports = {
    verifyToken, 
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
}