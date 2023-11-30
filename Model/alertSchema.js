const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    title: String,
    alert: String,
    created_by: String,
    created_at: Date,    
});  

const Alert = mongoose.model("Alert", alertSchema);
module.exports = Alert;
