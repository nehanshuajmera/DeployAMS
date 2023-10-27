const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode=require("jwt-decode");
const Recordlog = require("./logs");

exports.createnewuser= async (req, res) => {
    // console.log("Register :",req.body);
    try {
      const { username,email,password } = req.body;
      if (!username || !email || !password)
        return res.status(400).json({ errorMessage: "Please enter all required fields." });
    var passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
    // if (!passwordregex.test(password))
    //     return res.status(400).json({ errorMessage: "Password Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character", });
    if(password.length<8){
        return res.status(400).json({ errorMessage: "Password Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character", });
    }
    var emailregex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if (!emailregex.test(email)){
        return res.status(400).json({ errorMessage: "Please enter Vaild Email", });
    }
    const existingUsername = await User.findOne({ username });
    const existingemail = await User.findOne({ email });
    if (existingUsername || existingemail)
        return res.status(400).json({ errorMessage: "An account with this Username already exists.", });
    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);
    // save a new user account to the db
    const newUser = new User({
        profilePic: "https://firebasestorage.googleapis.com/v0/b/vishal-6ccf0.appspot.com/o/icons8-customer-96.png?alt=media&token=8b3c091b-dad2-4831-a836-8c904a35d6a9",
        username,
        name: username,
        email,
        password:passwordhash,
        phone: "",
        githubid: "",
        admin: false,
        otherdetails: [],
        created_at: new Date(),
        updated_at: new Date(),
        account_status:"Active"
    });
    
    // console.log(req.ip)
    const savedUser = await newUser.save();
    Recordlog({user_id:savedUser._id,ip:req.ip,what:"New User Created"})
    // sign the token
    const token = jwt.sign(
        {
          user: savedUser._id,
        },
        process.env.JWT_SECRET
      );
    // send the token in a HTTP-only cookie
    res.cookie("token", token, {
        maxAge: 3 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }).status(200).send("Registration Successfully");

} catch (err) {
      res.status(400).send(err);
    }
}