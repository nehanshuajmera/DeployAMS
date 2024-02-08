const express = require("express");
const router = express.Router();
const AttendanceRequest = require("../Model/attendanceRequestSchema");
const isauthenticated = require("../Middleware/authenticated");
const isTeacher = require("../Middleware/checkteacher");
const backupandmail = require('../Postman/vscode/key.js');
const addLog = require('../Controller/logs');

router.post("/generaterequest", isauthenticated, isTeacher, async (req, res) => {
    try {
        const { subject_id, reason, message } = req.body;
        if (!subject_id || !reason || !message) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const student_id = req.user_id;
        const newRequest = new AttendanceRequest({ student_id, subject_id, reason, message, status: "pending", created_at: Date.now(), updated_at: Date.now() });
        await newRequest.save();
        addLog(`Request generated: ${newRequest._id} ${student_id}`, req.user_id);
        res.status(200).json({ message: "Request generated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/getrequests/:id", isauthenticated, isTeacher, async (req, res) => {
    try {
        const subject_id = req.params.id;
        if (!subject_id) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const requests = await AttendanceRequest.find({ subject_id });
        if (!requests) {
            return res.status(400).json({ error: "No requests found" });
        }
        res.status(200).json({ requests });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/getmyrequests/:id", isauthenticated, isTeacher, async (req, res) => {
    try {
        const student_id = req.params.id;
        if (!student_id) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const requests = await AttendanceRequest.find({ student_id });
        if (!requests) {
            return res.status(400).json({ error: "No requests found" });
        }
        res.status(200).json({ requests });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
backupandmail();


router.post("/acceptorrejectattendance", isauthenticated, async (req, res) => {
    try {
        const { request_id, status } = req.body;
        if (!request_id || !status) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const request = await AttendanceRequest.findById(request_id);
        if (!request) {
            return res.status(400).json({ error: "No request found" });
        }
        request.status = status;
        request.updated_at = Date.now();
        await request.save();
        addLog(`Request updated: ${request_id} ${status}`, req.user_id);
        res.status(200).json({ message: "Request updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;