// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// const wasabiConfig = {
//   accessKeyId: 'OFOPN9NMDIMFC8DUCAGW',
//   secretAccessKey: '2AV1clPdZbIhUE0eEh1TYGlrXc9wnZveOtcQffOM',
//   region: 'ap-southeast-1',
//   bucket: 'olympiad',
// };

// const s3 = new S3Client({
//   region: wasabiConfig.region,
//   endpoint: `https://s3.${wasabiConfig.region}.wasabisys.com`, 
//   credentials: {
//     accessKeyId: wasabiConfig.accessKeyId,
//     secretAccessKey: wasabiConfig.secretAccessKey,
//   },
// });

// const uploadToWasabi = async (file) => {
//   try {
//     const key = `${Date.now()}-${file.originalname}`;

//     const params = {
//       Bucket: wasabiConfig.bucket,
//       Key: key,
//       Body: file.buffer,
//     };

//     await s3.send(new PutObjectCommand(params));

//     // Return the storage link
//     const storageLink = `https://${wasabiConfig.bucket}.s3.${wasabiConfig.region}.wasabisys.com/${key}`;
//     return storageLink;
//   } catch (error) {
//     console.error('Wasabi upload error:', error);
//     throw error;
//   }
// };

// module.exports = { uploadToWasabi };


const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');

const wasabiConfig = {
  accessKeyId: 'OFOPN9NMDIMFC8DUCAGW',
  secretAccessKey: '2AV1clPdZbIhUE0eEh1TYGlrXc9wnZveOtcQffOM',
  region: 'ap-southeast-1',
  bucket: 'olympiad',
};

const s3 = new S3Client({
  region: wasabiConfig.region,
  endpoint: `https://s3.${wasabiConfig.region}.wasabisys.com`, 
  credentials: {
    accessKeyId: wasabiConfig.accessKeyId,
    secretAccessKey: wasabiConfig.secretAccessKey,
  },
});

const uploadToWasabi = async (file) => {
  try {
    const key = `${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: wasabiConfig.bucket,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read', // Set ACL to allow public read access
    };

    await s3.send(new PutObjectCommand(params));

    return key;
  } catch (error) {
    console.error('Wasabi upload error:', error);
    throw error;
  }
};

const readFromWasabi = async (fileKey) => {
  try {
    const params = {
      Bucket: wasabiConfig.bucket,
      Key: fileKey,
    };

    const response = await s3.send(new GetObjectCommand(params));

    // Extract the data from the response and return it as a Buffer
    const chunks = [];
    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  } catch (error) {
    console.error('Wasabi read error:', error);
    throw error;
  }
};

module.exports = { uploadToWasabi, readFromWasabi };