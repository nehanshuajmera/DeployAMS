const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/test",(req,res)=>{
    res.send("Testing")
  })


  app.use((req, res, next) => {
      const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      // console.log(req.headers['x-forwarded-for'], " : ",req.connection.remoteAddress," , ",`User IP: ${clientIp}`)
      // const clientIp = req.ip; // Get the user's IP address from the request
      console.log(`User IP: ${clientIp}`);
      next(); // Call the next middleware in the chain
    });
    
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

const path=require("path");

app.use(express.static('client/dist'));
 app.get('*', (req, res) => {
        res.sendFile(path.resolve('client','dist','index.html'));
});