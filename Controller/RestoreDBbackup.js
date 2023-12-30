const path = require('path');
const fs = require('fs').promises;
const mongoose = require('mongoose');

// Set the static backup file path
const BACKUP_FILE_PATH = path.join(__dirname, 'backups', 'database.json');

const restoreDatabase = async () => {
  try {
    // Read the backup file
    const backupData = await fs.readFile(BACKUP_FILE_PATH, 'utf-8');

    // Parse the JSON data
    const parsedData = JSON.parse(backupData);

    // Drop all collections in the current database
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const collection of collections) {
      await mongoose.connection.db.collection(collection.name).drop();
    }

    // Restore each collection with the data from the backup
    for (const [collectionName, documents] of Object.entries(parsedData)) {
      // Check if the documents array is not empty
      if (documents.length > 0) {
        await mongoose.connection.db.collection(collectionName).insertMany(documents);
        console.log(`Collection ${collectionName} restored successfully.`);
      } else {
        console.log(`Skipping empty collection: ${collectionName}`);
      }
    }

    console.log('Database restored successfully.');
  } catch (error) {
    console.error('Error restoring database:', error);
  }
};

module.exports = restoreDatabase;
