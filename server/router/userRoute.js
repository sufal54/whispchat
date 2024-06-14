const router = require("express").Router();
const user = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/isAuth.js");


router.post("/register", async (req, res) => {
    const { fullName, userName, password, profilePhoto, gender } = req.body;
    if (!fullName || !userName || !password || !gender) {
        return res.status(204).json({ success: false, message: "Incomplete Data for Saving" });
    }
    try {
        const isExist = await user.findOne({ userName: userName });
        if (isExist) {
            return res.status(400).json({ success: false, message: "User Exist" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const createUser = new user({
            fullName,
            userName,
            password: hashPassword,
            profilePhoto,
            gender
        });
        const data = await createUser.save();
        return res.status(202).json({ success: true, data });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Error to Save User" });
    }
});

router.get("/login/:userName/:password", async (req, res) => {
    const { userName, password } = req.params;
    if (!userName || !password) {
        return res.status(204).json({ success: false, message: "Incomplete Data for Login" });
    }
    try {
        const data = await user.findOne({ userName });
        if (!data) {
            return res.status(400).json({ success: false, message: "User not Exist" });
        }
        if (!await bcrypt.compare(password, data.password)) {
            return res.status(400).json({ success: false, message: "Wrong Password" });
        }
        const tokenData = {
            userId: data._id
        }
        const token = await jwt.sign(tokenData, process.env.JWTSECREAT, { expiresIn: '30d' });
        return res.status(200).cookie("userToken", token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({ success: true, data });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Error to Login User" });
    }
});

router.get("/userdata", async (req, res) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            return res.status(400).json({ success: false, message: "No token" });
        }
        const decode = await jwt.verify(token, process.env.JWTSECREAT);
        if (!decode) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        const data = await user.findOne({ _id: decode.userId });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invaild Cookies" });
    }
});

router.get("/logout", (req, res) => {
    try {
        return res.status(200).cookie("userToken", "", { maxAge: 0 }).json({ success: true, message: "User log-Out" });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Error to Logout User" });
    }
});

router.get("/getAll", isAuth, async (req, res) => {
    try {
        const loggedUser = req.id;
        const otheUser = await user.find({ _id: { $ne: loggedUser } }).select("-password").sort({ createdAt : -1 });
        return res.status(200).json({ success: true, otheUser });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid Auth" });
    }
})

module.exports = router;