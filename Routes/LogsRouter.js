const router = require("express").Router();
const Logs = require("../Model/LogsModel");
const isauthenticated = require("../Middleware/isauthenticated")
//Root route
router.get("/",(req, res) => {
    try {
        Logs.find()
        .then((logs) => res.json(logs))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      res.status(400).send(err);
    }
});

module.exports = router;