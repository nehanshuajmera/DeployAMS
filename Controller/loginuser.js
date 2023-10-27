const router = require("express").Router();
const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode=require("jwt-decode");

exports.loginuser= async (req, res) => {
    try {
        const { usernameoremail,password } = req.body;
        // console.log(req.body)
        if(!usernameoremail||!password){
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        }
        var emailregex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        var existinguser;
        if (emailregex.test(usernameoremail)){
             existinguser = await User.findOne({ email:usernameoremail });
        }
        else{
             existinguser = await User.findOne({ username:usernameoremail });
        }
        if(existinguser.account_status!=="Active"){
            return res.status(400).json({ errorMessage: "Account Does Not Exist", });
        }
        const passwordCorrect = await bcrypt.compare(password,existinguser.password);
        if(!passwordCorrect){
            return res.status(400).json({ errorMessage: "Incorrect Password", });
        }
        const token = jwt.sign({ user: existinguser._id}, process.env.JWT_SECRET, {
            expiresIn: "3h",
        });
        // send the token in a HTTP-only cookie
        res.cookie("token", token, {
            maxAge: 3 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).status(200).send("Login Successfully");

    } catch (err) {
        res.status(400).send(err);
    }
}