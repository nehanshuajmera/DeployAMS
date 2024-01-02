const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cron = require('node-cron');
const updateTodayAttendance = require("./Controller/UpdateTodayAttendance");
const fileUpload = require('express-fileupload');
const rateLimit = require("express-rate-limit");
const path=require("path");

dotenv.config();
app.use(express.json());
app.use(fileUpload());

app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true,
})
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Use rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(limiter);

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
    
    
    app.use(express.static('admin/dist'));
    app.get('*', (req, res) => {
            res.sendFile(path.resolve('admin','dist','index.html'));
    });

    // Schedule the cron jobs
    cron.schedule('31 5 * * *', async () => {
      console.log('Running teacher rating update job...');
      try {
        const result = await updateTodayAttendance();
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
  
  // const result = updateTodayAttendance();
  // console.log(result);
  

