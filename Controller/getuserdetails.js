const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const jwt_decode=require("jwt-decode");

exports.getuserdetails= async (req, res) => {
    try {
        const token = req.cookies.token;
        const verified =await jwt.verify(token, process.env.JWT_SECRET);
        const existinguser = await User.findById(verified.user);
        // console.log("USER DETAILS :",existinguser);
        res.status(200).send(existinguser)
    } catch (err) {
        res.status(400).send(err);
    }
}