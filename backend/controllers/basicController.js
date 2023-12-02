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
const { uploadToWasabi } = require('../middlewares/wasabi');
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
  
          // try {
          //   await validationSchema.validate(data, { abortEarly: false, strict: true });
          // } catch (err) {
          //   res.status(400).json({ errors: err.errors });
          //   return;
          // }
  
          // Create BasicInfo row with file links and other fields
          const createdBasicInfo = await prisma.BasicInfo.create({
            data: {
              userId: req.user.id,
              phoneno: "213123",
              cnic: "123123",
              guardianName: "Asd",
              guardianNumber: "4565",
              schoolName: "sdadsa",
              address: "data.address",
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

  
  