const express = require('express');
const router = express.Router();
const scheduleRequest = require('../Model/scheduleRequestSchema');
const Teacher = require('../Model/teacherSchema');
const Subject = require('../Model/subjectSchema');
const isauthenticated = require('../Middleware/authenticated');
const isTeacher = require('../Middleware/checkteacher');

// It is used to post a Attendence Manipulation request in the server 
router.post('/request',isauthenticated,isTeacher, async (req, res) => {
    try {
        const { subject, type, proposedDateTime, reason } = req.body;
        const teacherId = subject.teacher_id;

        // Find the teacher by teacher_id to associate the request with them
        const teacher = await Teacher.findOne({ teacher_id: teacherId });

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Create a new rescheduling request
        const request = new scheduleRequest({
            teacher: teacher._id,
            typeOfRequest: type,
            proposedDateTime: proposedDateTime,
            reason: reason,
            subject: subject._id, // Include subject details in the request
        });

        // Save the request to the database
        const savedRequest = await request.save();

        return res.status(200).json({ message: 'Rescheduling request created successfully', requestId: savedRequest._id });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error , error in /post Schedulerequest Schema ' });
    }
});


// If a teacher wants to see the status of its schedule request .
router.get('/requestStatus/:id',isauthenticated,isTeacher, async (req, res) => {
    try {

        const requestId = req.params.id;
        const request = await scheduleRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        const reqStatus = request.status;
        return res.status(200).json({ message: "Request Status Delivered Succesfully", requestStatus: reqStatus });

    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error , error in /requestStatus/:id Schedulerequest Router ' });
    }
});

// This API collect all the request from request Database and display it to admin 
router.get('/getAllRequest',isauthenticated,isTeacher, async (req, res) => {
    try {
        const allRequest = await scheduleRequest.find({ status: 'pending' });
        return res.status(200).json(allRequest);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error , error in //getAllRequest in  Schedulerequest Router ' });
    }
})

// This operation is Done by Admin to update the Request
router.put('/updateRequest/:id',isauthenticated,isTeacher, async (req, res) => {
    try {
        // Destructure request parameters from the request body
        const { status, comment, ActualDate, ProposedDate, Day, classCount } = req.body;

        // Get the request ID from the URL parameters
        const requestId = req.params.id;

        // Find the schedule request by ID and populate related data
        const Request = await scheduleRequest.findById(requestId)
            .populate('subject') // Populate subject data
            .populate('teacher') // Populate teacher data
            .exec();

        // Check if the request exists
        if (!Request) {
            return res.status(404).json({ message: 'Schedule request not found, error in /updateRequest/:id' });
        }

        // Update the request status and Admin's comment
        Request.status = status;
        Request.adminComment = comment;

        //  if Request is denied or is in the pending state 
        if(status=='denied')
        return res.status(200).json({ message: 'Request updated successfully', updatedRequest });

        // Get the subject ID
        const subID = Request.subject._id;

        // Access the subject object from the request
        const subject = Request.subject;

        // Check the type of request
        if (Request.typeOfRequest == 'update') {
            // Find a record with the specified actual date from the updateAttendance array 
            // It is done to check if there is already a request present for that Date. 
            let record = await subject.updateAttendance.find({ actualDate: ActualDate });
            if (!record) {
                // If no record is found, add a new entry to updateAttendance
                subject.updateAttendance.push({ actualDate:ActualDate,status:true });
            } else {
                // If a record exists, mark it as 'true'
                record.status = true;
            }
            await subject.save();
        }
        else if (Request.typeOfRequest == 'reschedule') {
            // Add a new entry to rescheduleClass
            await subject.rescheduleClass.push({ Day, dateOfreschedule: ProposedDate });
            await subject.save();
        }
        else if (Request.typeOfRequest == 'extra') {
            // Add a new entry to extraClass
            await subject.extraClass.push({ dateOfClass: ProposedDate, count: classCount });
            await subject.save();
        }

        // Save the updated request
        const updatedRequest = await Request.save();

        // Respond with a success message and the updated request
        return res.status(200).json({ message: 'Request updated successfully', updatedRequest });

    }
    catch (error) {
        // Handle any errors with a server error message
        return res.status(500).json({ message: 'Internal server error, error in /updateRequest/:id ScheduleRequest Router' });
    }
})




module.exports = router;
