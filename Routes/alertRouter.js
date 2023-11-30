const express = require("express");
const router = express.Router();
const isAdmin = require("../Middleware/checkadmin");
const isauthenticated = require("../Middleware/authenticated");
const Alert = require("../Model/alertSchema");

router.get("/", isauthenticated, async(req, res) => {
    try {
        
        const alerts = await Alert.find();
        
        // Send the user_role in the response
        return res.status(200).json({ message: alerts });
    
    } catch (error) {
        console.log({error})
        return res.status(500).json({ message: "Internal server error", error:error });
    }
});


//create new alert api

router.post("/createalert", isauthenticated, isAdmin, async(req, res) => {
    try {
        // console.log("Create Alert Api", req.body)
        const {title, alert} = req.body;
        
        created_by = req.user_id;
        created_at = new Date();
        
        if (!title || !alert || !created_by || !created_at) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const alertData = new Alert({title, alert, created_by, created_at});
        const alertCreated = await alertData.save();
        return res.status(200).json({ message: alertCreated });
    } catch (error) {
        console.log({error})
        return res.status(500).json({ message: "Internal server error", error:error });
    }
});



module.exports = router;