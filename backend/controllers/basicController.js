const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const yup = require("yup");
require('yup-password')(yup);
const { sign,verify } = require('jsonwebtoken');
require('dotenv').config();
const { validateToken } = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Store the file buffer in memory

// const upload = multer({ dest: '../middlewares' }); // Specify the destination folder
const { uploadToWasabi, readFromWasabi } = require('../middlewares/wasabi');
// const { uploadFileToWasabi } = require('../middlewares/uploadservice');



const prisma = new PrismaClient();


module.exports.basicInfo = async (req, res) => {
    try {
      upload.fields([{ name: 'cnicFront', maxCount: 1 }, { name: 'cnicBack', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'File upload error', error: err.message });
        }
  
        const cnicFrontFile = req.files['cnicFront'] ? req.files['cnicFront'][0] : null;
        const cnicBackFile = req.files['cnicBack'] ? req.files['cnicBack'][0] : null;
  
        if (!cnicFrontFile || !cnicBackFile) {
          return res.status(400).json({ message: 'Both files (cnicFront and cnicBack) are required' });
        }
  
        try {
          if (cnicFrontFile.buffer.length === 0 || cnicBackFile.buffer.length === 0) {
            return res.status(400).json({ message: 'Invalid file buffer' });
          }
  
          const cnicFrontLink = await uploadToWasabi(cnicFrontFile);
          const cnicBackLink = await uploadToWasabi(cnicBackFile);
  
          // Validate other fields
          let validationSchema = yup.object().shape({
            phoneno: yup.string().trim().required(),
            cnic: yup.string().trim().required(),
            guardianName: yup.string().trim().required(),
            guardianNumber: yup.string().trim().required(),
            schoolName: yup.string().trim().required(),
            address: yup.string().trim().required(),
          });
  
          let data = req.body;
  
          try {
            await validationSchema.validate(data, { abortEarly: false, strict: true });
          } catch (err) {
            res.status(400).json({ errors: err.errors });
            return;
          }
  
          // Create BasicInfo row with file links and other fields
          const createdBasicInfo = await prisma.BasicInfo.create({
            data: {
              userId: req.user.id,
              phoneno: data.phoneno.toString(),
              cnic: data.cnic.toString(),
              guardianName: data.guardianName,
              guardianNumber: data.guardianNumber.toString(),
              schoolName: data.schoolName,
              address: data.address,
              cnicFront: cnicFrontLink,
              cnicBack: cnicBackLink,
            },
          });
  
          // Generate access token and send the response
          const user = await prisma.user.findUnique({
            where: { id: req.user.id },
          });
  
          const userInfo = {
            id: user.id,
            email: user.email,
          };
  
          const accessToken = sign(userInfo, process.env.APP_SECRET);
  
          res.json({
            accessToken: accessToken,
            user: userInfo,
            basicInfo: createdBasicInfo,
          });
        } catch (error) {
          console.error('Wasabi upload error:', error);
          res.status(500).json({ message: 'Wasabi upload error', error: error.message });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

  
  // module.exports.getImage = async (req, res)=>{
  //   const fileKey = '1701543339354-front.JPG';
  //   try {
  //     const objectData = await readFromWasabi(fileKey);
  //     console.log(objectData);
  //     // Do something with the retrieved object data
  //     res.send("<h1>Success</h1>")
  //   } catch (error) {
  //     console.error('Error retrieving object:', error);
  //   }
  // }

  module.exports.getImage = async (req, res) => {
    const fileKey = req.body.fileKey;
    try {
      const objectData = await readFromWasabi(fileKey);
  
      // Check if objectData is already a Buffer
      const imageData = Buffer.isBuffer(objectData) ? objectData : Buffer.from(objectData);
  
      // Convert the image data to a base64 string
      const base64Image = imageData.toString('base64');
  
      // Set the appropriate content type for the image
      res.set('Content-Type', 'text/html');
  
      // Embed the image data in an HTML img tag and send it in the response
      res.send(`<img src="data:image/jpeg;base64,${base64Image}" alt="Image">`);
    } catch (error) {
      console.error('Error retrieving object:', error);
      res.status(500).send('Error retrieving image');
    }
  };