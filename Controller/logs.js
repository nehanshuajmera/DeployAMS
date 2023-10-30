const Log = require("../Model/logSchema")

const addLog = async (message, createdBy) => {
    try {
      const log = new Log({
        message,
        createdBy,
      });
  
      // Save the log to the database
      await log.save();
      console.log('Log created successfully');
    } catch (error) {
      console.error('Error creating log:', error);
    }
  };

module.exports = addLog;