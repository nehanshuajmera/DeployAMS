const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cron = require('node-cron');
const updateTodayAttendance = require("./Controller/UpdateTodayAttendance");
const removeAssignedSubject = require("./Controller/RemoveAssignedSubject");
const fileUpload = require('express-fileupload');
const rateLimit = require("express-rate-limit");
const path=require("path");

dotenv.config();
app.use(express.json());

app.use(fileUpload());


app.use(cors({
  origin: [
    // "http://localhost:5173",
    "https://medicaps-ams-student.netlify.app"
  ],
  credentials: true,
})
);

app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Use rate limiting middleware
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 1 minutes
  max: 300, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(limiter);

// app.use((req, res, next) => {
//   const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   console.log(`User IP: ${clientIp}`);
//   next(); // Call the next middleware in the chain
// });

// connect to mongoDB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MDB_CONNECT)
  .then(() => {
    console.log('Mongodb connected');

    // set up routes
    app.use("/api/calander", require("./Routes/calanderRouter.js"));
    app.use("/api/teacher", require("./Routes/teacherRouter.js"));
    app.use("/api/authentic", require("./Routes/checkauthRouter.js"));
    app.use("/api/student", require("./Routes/studentRouter.js"));
    app.use("/api/admin", require("./Routes/adminRouter.js"));
    app.use("/api/logs", require("./Routes/logRouter.js"));
    app.use("/api/schedule", require("./Routes/scheduleRouter"));
    app.use("/api/updatepastattendance", require("./Routes/updateattendanceRouter"));
    app.use("/api/alert", require("./Routes/alertRouter"));
    app.use("/api/xlsx", require("./Routes/xlsxRouter"));
    app.use("/api/studentattendancerequest", require("./Routes/attendanceRequestRouter.js"));
    app.use("/api/mapstudentsubject", require("./Routes/combineStudentandSubject.js"));
    app.use("/api/academichead", require("./Routes/academicHeadRouter.js"));
    app.use("/api/substituteteacher", require("./Routes/substituteTeacher.js"));
    
    
    app.use(express.static('admin/dist'));
    app.get('*', (req, res) => {
            res.sendFile(path.resolve('admin','dist','index.html'));
    });

    // app.use(express.static('client/dist'));
    // app.get('*', (req, res) => {
    //         res.sendFile(path.resolve('client','dist','index.html'));
    // });

    // Schedule the cron jobs
    cron.schedule('31 5 * * *', async () => {
      console.log('Running teacher rating update job...');
      try {
        const result = await updateTodayAttendance();
        removeAssignedSubject();
        console.log(result);

      } catch (error) {
        console.error('Error updating attendance:', error);
      }
    });

    
    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`Server started on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
  
