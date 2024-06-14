const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            return res.status(400).json({ success: false, message: "No token" });
        }
        const decode = await jwt.verify(token, process.env.JWTSECREAT);
        if (!decode) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: "Error to Auth User" });
    }
};

module.exports = isAuth;