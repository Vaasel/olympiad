const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const yup = require("yup");
require('yup-password')(yup);
const { sign,verify } = require('jsonwebtoken');
require('dotenv').config();
const { validateToken } = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Store the file buffer in memory
const {transporter} = require("../utils/mailer");


// const upload = multer({ dest: '../middlewares' }); // Specify the destination folder
const { uploadToWasabi, readFromWasabi } = require('../middlewares/wasabi');
// const { uploadFileToWasabi } = require('../middlewares/uploadservice');



const prisma = new PrismaClient();


module.exports.getAllUserDetails = async (req, res) => {
  try {
    const userDetails = await prisma.user.findMany({
      include: {
        basicInfo: true, // Assuming 'BasicInfo' is the relation field in your user model
      },
    });

    res.json({
      userDetails: userDetails,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getSingleUserDetails = async (req, res) => {
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        id: req.body.id,
      },
      include: {
        basicInfo: true,
      },
    });

    res.json({
      userDetails: userDetails,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports.ApplyAccomodation = async (req,res) => {
  const updatedBasicInfo = await prisma.BasicInfo.update({
    where: { userId: req.user.id },
    data: {
      accomodation: true,
    },
  });

  res.json({
    message: 'BasicInfo updated successfully',
    basicInfo: updatedBasicInfo,
  });
}

module.exports.setStatus = async (req,res) => {
  const data = req.body;

  console.log(data.userId);
  const id = data.userId;
  // const entry = await prisma.BasicInfo.findUnique({
  //   where: { userId: data.userId},
  // });

  const user = await prisma.user.findUnique({
    where: {
      id: data.userId,
    }
  });


  const updatedBasicInfo = await prisma.BasicInfo.update({
    where: { userId: data.userId },
    data: {
      Reason: data.Reason,
      status: data.status,
    },
  });

  const mailOptions = {
    from: "info.olympiad@nust.edu.pk",
    to: user.email, // Email address you want to send the email to
    subject: "Test Email from Nodemailer",
    html: `<h1>Status Changed</h1><p>Your new status is <br/><h2><code>${data.status}</code></h2> and the reason is ${data.reason}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });

  res.json({
    message: 'BasicInfo updated successfully',
    basicInfo: updatedBasicInfo,
  });


}

module.exports.basicDisplay = async (req, res) => {
  try{
    const id = req.user.id;
    const entry = await prisma.BasicInfo.findUnique({
      where: { userId: req.user.id },
    });

    res.json({"entry":entry});


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports.basicInfoUpdate = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedData = req.body;

    const filteredUpdatedData = Object.fromEntries(
      Object.entries(updatedData).filter(([_, value]) => value !== undefined && value !== null)
    );
    
    // let fileup = [];
    upload.fields([{ name: 'cnicFront', maxCount: 1 }, { name: 'cnicBack', maxCount: 1 }, { name: 'stdFront', maxCount: 1 }, { name: 'stdBack', maxCount: 1 }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error', error: err.message });
      }

      fileup = {};
      const uploadAndAddToDictionary = async (fileKey) => {
        if (req.files[fileKey]) {
          const link = await uploadToWasabi(req.files[fileKey][0]);
          fileup[fileKey] = link;
        }
      };
      
      await uploadAndAddToDictionary('cnicFront');
      await uploadAndAddToDictionary('cnicBack');
      await uploadAndAddToDictionary('stdFront');
      await uploadAndAddToDictionary('stdBack');


      const getFileLink = (fileName) => {
        try {
          if (fileup.hasOwnProperty(fileName)) {
            return fileup[fileName];
          } else {
            return null;
          }
        } catch (error) {
          console.error(error.message);
          return null; // or handle the error as needed
        }
      };
      
      // console.log(fileup);
      const cnicFrontLink = getFileLink('cnicFront');
      const cnicBackLink = getFileLink('cnicBack');
      const stdFrontLink = getFileLink('stdFront');
      const stdBackLink = getFileLink('stdBack');

      // console.log(cnicFrontLink); 
      // console.log(cnicBackLink);
      // console.log(stdFrontLink);
      // console.log(stdBackLink);
      const updatedBasicInfoData = {
        ...filteredUpdatedData,
      };

      if (stdFrontLink !== null) updatedBasicInfoData.stdFront = stdFrontLink;
      if (stdBackLink !== null) updatedBasicInfoData.stdBack = stdBackLink;
      if (cnicFrontLink !== null) updatedBasicInfoData.cnicFront = cnicFrontLink;
      if (cnicBackLink !== null) updatedBasicInfoData.cnicBack = cnicBackLink;
      console.log(updatedBasicInfoData);
      const updatedBasicInfo = await prisma.BasicInfo.update({
        where: { userId: userId },
        data: updatedBasicInfoData,
      });
  
      // Send the response
      res.json({
        message: 'BasicInfo updated successfully',
        basicInfo: updatedBasicInfo,
      });

    });

    

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};





module.exports.basicInfoCreate = async (req, res) => {
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
            phoneno: "data.phoneno.toString()",
            cnic: "data.cnic.toString()",
            guardianName: "data.guardianName",
            guardianNumber: "data.guardianNumber.toString()",
            schoolName: "data.schoolName",
            gender: true,
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

        const BasicInfoCreated = {
          id: req.user.id,
        }

        const accessToken = sign(userInfo, process.env.APP_SECRET);

        // const accessToken = sign(
        //   { id: userInfo.id, email: userInfo.email, basicid: createdBasicInfo.userId },
        //   process.env.APP_SECRET,
        //   { expiresIn: process.env.JWT_EXPRIES }
        // );
    
        // res.json({
        //   accessToken: accessToken,
        //   user: userInfo,
        // });

        res.json({
          accessToken: accessToken,
          user: userInfo,
          basicInfo: BasicInfoCreated,
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



module.exports.SecondPage = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if user is available in req object
    if (!userId) {
      return res.status(400).json({ message: 'Invalid request format' });
    }

    // const { studentOf, student_id, schoolName, ambassadorcode } = req.body;


    const studentOf = 'nust';
    const student_id = '3';
    const schoolName = 'sad';
    const ambassadorcode = 'asds'
    // Validate fields based on studentOf selection
    let validationSchema;

    if (studentOf === 'other') {
      validationSchema = yup.object().shape({
        studentOf: yup.string().trim().required(),
      });
    } else {
      validationSchema = yup.object().shape({
        studentOf: yup.string().trim().required(),
        student_id: yup.string().trim().required(),
        schoolName: yup.string().trim().required(),
        ambassadorcode: yup.string().trim().required(),
      });
    }


    
    if (studentOf !== 'other'){
      let stdFrontLink, stdBackLink;

      upload.fields([{ name: 'stdFront', maxCount: 1 }, { name: 'stdBack', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'File upload error', error: err.message });
        }
  
        const stdFrontFile = req.files['stdFront'] ? req.files['stdFront'][0] : null;
        const stdBackFile = req.files['stdBack'] ? req.files['stdBack'][0] : null;
  
        if (stdFrontFile && stdBackFile) {
          try {
            stdFrontLink = await uploadToWasabi(stdFrontFile);
            stdBackLink = await uploadToWasabi(stdBackFile);
          } catch (error) {
            console.error('Wasabi upload error:', error);
            res.status(500).json({ message: 'Wasabi upload error', error: error.message });
            return;
          }
        }
  
        
  
        // Update BasicInfo record
        const updatedBasicInfo = await prisma.BasicInfo.update({
          where: { userId: parseInt(userId) },
          data: {
            studentOf: studentOf,
            student_id: student_id || null,
            schoolName: schoolName || null,
            ambassadorcode: ambassadorcode || null,
            stdFront: stdFrontLink || null,
            stdBack: stdBackLink || null,
          },
        });
  
        // Generate access token and send the response
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
  
        const userInfo = {
          id: user.id,
          email: user.email,
        };
  
        const accessToken = sign(userInfo, process.env.APP_SECRET);
  
        res.json({ message: 'BasicInfo updated successfully', updatedBasicInfo, accessToken });
      });

    } else {
      const updatedBasicInfo = await prisma.BasicInfo.update({
        where: { userId: parseInt(userId) },
        data: {
          studentOf: studentOf,
          student_id:  null,
          schoolName:  null,
          ambassadorcode: null,
          stdFront: null,
          stdBack: null,
        },
      });

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      const userInfo = {
        id: user.id,
        email: user.email,
      };

      const accessToken = sign(userInfo, process.env.APP_SECRET);
      res.json({ message: 'BasicInfo updated successfully', updatedBasicInfo, accessToken });
    }


    // try {
    //   await validationSchema.validate(
    //     { studentOf, student_id, schoolName, ambassadorcode },
    //     { abortEarly: false, strict: true }
    //   );
    // } catch (err) {
    //   res.status(400).json({ errors: err.errors });
    //   return;
    // }
    // Process image uploads if available
    
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