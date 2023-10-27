const router = require("express").Router();
const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode=require("jwt-decode");
const { createnewuser } = require("../Controller/createnewuser");
const { loginuser } = require("../Controller/loginuser");
const isauthenticated = require("../Middleware/isauthenticated");
const { getuserdetails } = require("../Controller/getuserdetails");
const { logoutuser } = require("../Controller/logoutuser");
const Recordlog = require("../Controller/logs");

router.post("/register",createnewuser);
router.post("/login",loginuser);
router.get("/isauthentic",isauthenticated,getuserdetails);
router.get("/logout",isauthenticated,logoutuser);

router.post("/resetpassword/:id",async (req,res)=>{
    // console.log("API Calll",{newpassword})
    const {newpassword}=req.body;
    const token = req.params.id;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const existinguser = User.findById(verified.user);
    Recordlog({user_id:existinguser._id,ip:req.ip,what:"forget Password"})
    // var passwordregex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
    // if (!passwordregex.test(newpassword))
    //     return res.status(400).json({ errorMessage: "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character", });

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(newpassword, salt);

    User.findOneAndUpdate({_id:verified.user},{password})
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
})


module.exports = router;