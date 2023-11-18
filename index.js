const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
// const cron = require('node-cron');
// const calculateTeacherRatings = require("./Controller/rattingcron") 

dotenv.config();
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);


// connect to mongoDB

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MDB_CONNECT) 
.then(()=>{console.log('Mongodb connected')});

// set up routes
app.use("/api/authentic", require("./Routes/checkauthRouter.js"));
app.use("/api/student", require("./Routes/studentRouter.js"));
app.use("/api/teacher", require("./Routes/teacherRouter.js"));
app.use("/api/calander", require("./Routes/calanderRouter.js"));
app.use("/api/admin", require("./Routes/adminRouter.js"));
app.use("/api/logs", require("./Routes/logRouter.js"));
app.use("/api/schedule",require("./Routes/scheduleRouter"));

// Schedule the cron job to run at 3 am every day
// cron.schedule('0 3 * * *', () => {
//   console.log('Running teacher rating update job...');
//   calculateTeacherRatings();
// });

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server started on port: ${PORT}`);
});