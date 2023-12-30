const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

const backupDatabase = async () => {
  try {
    const backupDir = path.join(__dirname, 'backups');
  
    const collections = await mongoose.connection.db.listCollections().toArray();
    const backupData = {};

    for (const collection of collections) {
      const documents = await mongoose.connection.db.collection(collection.name).find().toArray();
      backupData[collection.name] = documents;
    }

    const backupFileName = 'database.json';
    // const backupFileName = `backup_${new Date().toISOString()}.json`;

    const backupFilePath = path.join(backupDir, backupFileName);

    await fs.writeFile(backupFilePath, JSON.stringify(backupData, null, 2));
    console.log('Backup file created successfully');

  } catch (error) {
    console.error('Error creating backup:', error);
  }
};

module.exports = backupDatabase;
