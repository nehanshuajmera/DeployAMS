const express = require("express");
const router = express.Router();
const isauthenticated = require("../Middleware/authenticated");

// GET /check-auth - Check authentication and send user_role
router.get("/", isauthenticated, (req, res) => {
  try {
    const userRole = req.user_role;
    // Send the user_role in the response
    return res.status(200).json({ message: userRole });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
