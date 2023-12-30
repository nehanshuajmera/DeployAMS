const AWS = require('aws-sdk');
const fs = require('fs').promises;
const path = require('path');
const s3 = new AWS.S3();

const exportToS3 = async () => {
  try {
    const backupDir = path.join(__dirname, 'backups');
    // console.log('Backup directory:', backupDir);

    // Create the backup directory if it doesn't exist
    await fs.mkdir(backupDir, { recursive: true });
    // console.log('Backup directory created successfully');

    // Set the filename for the backup
    const backupFileName = `ams_backup_${new Date().toISOString()}.json`;
    const backupFilePath = path.join(backupDir, 'database.json');

    // Read the backup file
    const fileData = await fs.readFile(backupFilePath);

    // Set S3 bucket and key (path) for the backup
    const bucketName = process.env.AWS_BUCKET_NAME;
    const key = `backups/${backupFileName}`;

    // Upload the backup to S3
    await s3
      .putObject({
        Bucket: bucketName,
        Key: key,
        Body: fileData,
      })
      .promise();
      
      // Delete files older than 50 days from S3 bucket
      const fiftyDaysAgo = new Date();
      fiftyDaysAgo.setDate(fiftyDaysAgo.getDate() - 50);
      
      const listObjectsResponse = await s3.listObjectsV2({ Bucket: bucketName }).promise();
      
      for (const file of listObjectsResponse.Contents) {
        console.log(file.Key)
        if (file.LastModified < fiftyDaysAgo && file.Key.startsWith('backups/')) {
          await s3.deleteObject({ Bucket: bucketName, Key: file.Key }).promise();
          // console.log(`Deleted old file: ${file.Key}`);
        }
      }

    console.log('Backup uploaded to S3 successfully');
    
  } catch (error) {
    console.error('Error exporting to S3:', error);
  }
};

module.exports = exportToS3;