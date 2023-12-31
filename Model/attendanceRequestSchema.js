const mongoose = require("mongoose");

const attendanceRequestSchema = new mongoose.Schema({
    student_id: { type: String, required: true },
    subject_id: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    reason: { type: String, required: true },
    message : { type: String, required: true }
});

const AttendanceRequest = mongoose.model("AttendanceRequest", attendanceRequestSchema);

module.exports = AttendanceRequest;