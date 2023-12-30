const AWS = require('aws-sdk');
const s3 = new AWS.S3()

// Configure AWS SDK with your credentials and region

const listFilesInBucket = async () => {
    try {
        
    // List all objects in the bucket
    const response = await s3.listObjectsV2({ Bucket: process.env.AWS_BUCKET_NAME }).promise();
    
    // Print the list of files
    console.log('Files in S3 bucket:');
    response.Contents.forEach((file) => {
      console.log(file.Key);
    });

  } catch (error) {
    console.error('Error listing files:', error);
  }
};

module.exports = listFilesInBucket;