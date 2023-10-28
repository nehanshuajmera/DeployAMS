const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

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

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server started on port: ${PORT}`);
});