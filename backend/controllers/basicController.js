const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const yup = require("yup");
require("yup-password")(yup);
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const { validateToken } = require("../middlewares/auth");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Store the file buffer in memory
const { transporter } = require("../utils/mailer");

// const upload = multer({ dest: '../middlewares' }); // Specify the destination folder
const {
  uploadToWasabi,
  readFromWasabi,
  getSingleImage,
} = require("../middlewares/wasabi");
// const { uploadFileToWasabi } = require('../middlewares/uploadservice');

const prisma = new PrismaClient();

module.exports.getAllUserDetails = async (req, res) => {
  try {
    const userDetails = await prisma.user.findMany({
      include: {
        basicInfo: true, // Assuming 'BasicInfo' is the relation field in your user model
      },
    });

    if (!userDetails || userDetails.length === 0) {
      return res.apiError("Not Found", "No user details found", 404);
    }

    res.apiSuccess(userDetails);
  } catch (err) {
    res.apiError(err.message, "Failed", 500);
  }
};

module.exports.getSingleUserDetails = async (req, res) => {
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        basicInfo: true,
      },
    });

    if (!userDetails) {
      return res.apiError("Not Found", "User details not found", 404);
    }

    // Define an array of promises for image fetching
    const imagePromises = [
      getSingleImage(userDetails.basicInfo.cnicBack),
      getSingleImage(userDetails.basicInfo.cnicFront),
    ];

    // Check if stdBack and stdFront are not null before adding them to imagePromises
    if (userDetails.basicInfo.stdBack !== null) {
      imagePromises.push(getSingleImage(userDetails.basicInfo.stdBack));
    }
    if (userDetails.basicInfo.stdFront !== null) {
      imagePromises.push(getSingleImage(userDetails.basicInfo.stdFront));
    }

    // Use Promise.all to fetch all images concurrently
    const images = await Promise.all(imagePromises);

    // Error handling after fetching images
    if (images.some((image) => image instanceof Error)) {
      // Handle image fetching errors here
      return res.apiError(
        "Image Fetching Failed",
        "Failed to fetch one or more user images",
        500
      );
    }

    // Assign the fetched images to the userDetails object
    userDetails.basicInfo.cnicBack = images[0];
    userDetails.basicInfo.cnicFront = images[1];
    userDetails.basicInfo.stdBack =
      userDetails.basicInfo.stdBack === null ? null : images[2];
    userDetails.basicInfo.stdFront =
      userDetails.basicInfo.stdFront === null ? null : images[3];

    res.apiSuccess(userDetails);
  } catch (err) {
    res.apiError(err.message, "Failed", 500);
  }
};

module.exports.ApplyAccomodation = async (req, res) => {
  const updatedBasicInfo = await prisma.basicInfo.update({
    where: { userId: req.user.id },
    data: {
      accomodation: true,
    },
  });

  res.apiSuccess(updatedBasicInfo, "BasicInfo updated successfully");
};

module.exports.setStatus = async (req, res) => {
  const data = req.body;

  const validationSchema = yup.object().shape({
    userId: yup.number().required(),
    status: yup.string().required().oneOf(["rejected", "verified", "ban"]),
    reason: yup.string().required()
  });

  try {
    await validationSchema.validate(data, { abortEarly: false, strict: true });
  } catch (err) {
    console.log(err);
    res.apiError(err.errors, "Validation Failed", 400);
    return;
  }

  try {
    const [user, updatedBasicInfo] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: data.userId,
        },
      }),
      prisma.basicInfo.update({
        where: { userId: data.userId },
        data: {
          status: data.status,
        },
      }),
    ]);

    if (!user) {
      res.apiError(null, "User not found.", 404);
      return;
    }

    let mailOptions;
    if (data.status === "rejected") {
      mailOptions = {
        from: "info.olympiad@nust.edu.pk",
        to: user.email, // Email address you want to send the email to
        subject: "Olympiad'24 Application Status",
        html: ` <h3>Dear ${user.name},</h3>
        <p>After careful review, we regret to inform you that your user profile for Olympiad'24 has not been approved. Reason : ${data.reason}</p>
        <p>For any inquiries or clarification regarding the rejection, please contact our dedicated support team.</p>
        <p>We appreciate your understanding and hope to see your continued interest in the future.</p>
        <p>Best regards,</p>
      <p>Olympiad Team</p>
      `,
      };
    } else if (data.status === "verified") {
      mailOptions = {
        from: "info.olympiad@nust.edu.pk",
        to: user.email, // Email address you want to send the email to
        subject:
          "Welcome to Olympiad'24 - Your User Profile Has Been Approved!",
        html: `<h3>Dear ${user.name},</h3>
        <p>We are delighted to announce that your user profile has been successfully generated and approved on our platform. Welcome to Olympiad'24!</p>
        <p>With your approved user profile, you have access to all the exciting features and benefits we offer. We're confident your journey with us will be filled with learning, growth, and exciting opportunities.</p>
        <p>Thank you for choosing to reignite the torch with Olympiad'24! Your participation adds immense value to our community, and we look forward to seeing your achievements and contributions.</p>
        <p>If you have any questions or require further assistance, our dedicated support team is here to help.</p>
        <p>Best regards,</p>
      <p>Olympiad Team</p>
        `,
      };
    } else if (data.status === "ban") {
      mailOptions = {
        from: "info.olympiad@nust.edu.pk",
        to: user.email, // Email address you want to send the email to
        subject: "Important Notice: Olympiad Account Suspension",
        html: `<h3>Dear ${user.name},</h3>
        <p>We regret to inform you that your Olympiad account has been suspended due to ${data.reason}.</p>
        <p>For a detailed understanding of the reasons behind this action, please review our policies <a href="[link to policies]">here</a>.</p>
        <p>If you believe this suspension was issued in error or have any concerns, we encourage you to contact our dedicated support team at [support email] for further assistance.</p>
        <p>Best regards,</p>
      <p>Olympiad Team</p>
      `,
      };
    }

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.apiError(error, "Failed", 500);
      } else {
        console.log("Email sent: " + info.response);
        // res.send("Email sent successfully");
      }
    });

    res.apiSuccess(updatedBasicInfo, "BasicInfo updated successfully");
  } catch (error) {
    res.apiError(error.message, "Failed", 500);
  }
};

module.exports.basicDisplay = async (req, res) => {
  try {
    const id = req.user.id;

    const validationSchema = yup.object().shape({
      userId: yup.number().required(),
    });

    try {
      await validationSchema.validate(
        { userId: id },
        { abortEarly: false, strict: true }
      );
    } catch (err) {
      res.apiError(err.errors, "Validation Failed", 400);
      return;
    }

    const entry = await prisma.BasicInfo.findUnique({
      where: { userId: id },
    });

    // Check if entry is null and respond immediately if so
    if (!entry) {
      res.apiSuccess(entry);
      return;
    }

    // Define an array of promises for image fetching
    const imagePromises = [
      getSingleImage(entry.cnicBack),
      getSingleImage(entry.cnicFront),
    ];

    // Check if stdBack and stdFront are not null before adding them to imagePromises
    if (entry.stdBack !== null) {
      imagePromises.push(getSingleImage(entry.stdBack));
    }
    if (entry.stdFront !== null) {
      imagePromises.push(getSingleImage(entry.stdFront));
    }

    // Use Promise.all to fetch all images concurrently
    const images = await Promise.all(imagePromises);

    // Assign the fetched images to the entry object
    entry.cnicBack = images[0];
    entry.cnicFront = images[1];
    entry.stdBack = entry.stdBack === null ? null : images[2];
    entry.stdFront = entry.stdFront === null ? null : images[3];

    res.apiSuccess(entry);
  } catch (error) {
    console.error(error);
    res.apiError(error.message, "Failed", 500);
  }
};

module.exports.basicInfoUpdate = async (req, res) => {
  try {
    const userId = req.user.id;
    const olddata = await prisma.basicInfo.findUnique({
      where: {
        userId,
      }
    });


    // Use multer middleware to handle file uploads
    const multerUpload = multer().fields([
      { name: "cnicFront", maxCount: 1 },
      { name: "cnicBack", maxCount: 1 },
      { name: "stdFront", maxCount: 1 },
      { name: "stdBack", maxCount: 1 },
    ]);
	  

    multerUpload(req, res, async (err) => {
      if (err) {
        return res.apiError(
          "Failed",
          `File upload failed: ${err.message}`,
          500
        );
      }

      const uploadPromises = [
        "cnicFront",
        "cnicBack",
        "stdFront",
        "stdBack",
      ].map(async (fileKey) => {
        if (req.files && req.files[fileKey]) {
          try {
            const link = await uploadToWasabi(req.files[fileKey][0]);
            return { [fileKey]: link };
          } catch (error) {
            console.error(`Error uploading ${fileKey} file: ${error.message}`);
            return { [fileKey]: olddata[fileKey] };
          }
        }
        return { [fileKey]: olddata[fileKey] };
      });

      const fileupArray = await Promise.all(uploadPromises);
      const fileup = Object.assign({}, ...fileupArray);

      const getFileLink = (fileName) => {
        if (fileup.hasOwnProperty(fileName)) {
          return fileup[fileName];
        } else {
          return null;
        }
      };
		const updatedData = req.body;
		const filteredUpdatedData = Object.fromEntries(
      Object.entries(updatedData).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

      const updatedBasicInfoData = {
        ...filteredUpdatedData,
        status: "pending",
        stdFront: getFileLink("stdFront"),
        stdBack: getFileLink("stdBack"),
        cnicFront: getFileLink("cnicFront"),
        cnicBack: getFileLink("cnicBack"),
      };

      const updatedBasicInfo = await prisma.BasicInfo.update({
        where: { userId: userId },
        data: updatedBasicInfoData,
      });

      res.apiSuccess( updatedBasicInfoData, "BasicInfo updated successfully");
    });
  } catch (error) {
    console.error(error);
    res.apiError(error.message, "Failed", 500);
  }
};

module.exports.basicInfoCreate = async (req, res) => {
  try {
    upload.fields([
      { name: "cnicFront", maxCount: 1 },
      { name: "cnicBack", maxCount: 1 },
      { name: "profilePhoto", maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.apiError(err.message, "File upload error", 500);
      }

      const cnicFrontFile = req.files["cnicFront"]
        ? req.files["cnicFront"][0]
        : null;
      const cnicBackFile = req.files["cnicBack"]
        ? req.files["cnicBack"][0]
        : null;
      const profilePhotoFile = req.files["profilePhoto"]
        ? req.files["profilePhoto"][0]
        : null;

      if (!cnicFrontFile || !cnicBackFile || !profilePhotoFile) {
        return res.apiError(
          null,
          "Both the files (cnicFront, cnicBack, or profilePhoto) are required",
          400
        );
      }

      if (!profilePhotoFile) {
        return res.apiError(null, "The profile photo is required", 400);
      }

      try {
        if (
          cnicFrontFile.buffer.length === 0 ||
          cnicBackFile.buffer.length === 0 ||
          profilePhotoFile.buffer.length === 0
        ) {
          return res.apiError(null, "Invalid file buffer", 400);
        }

        // Use Promise.all for parallel file uploads
        const [cnicFrontLink, cnicBackLink, profilePhotoLink] =
          await Promise.all([
            uploadToWasabi(cnicFrontFile),
            uploadToWasabi(cnicBackFile),
            uploadToWasabi(profilePhotoFile),
          ]);

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
          await validationSchema.validate(data, {
            abortEarly: false,
            strict: true,
          });
        } catch (err) {
          return res.apiError(err.errors, "Validation Error", 400);
        }

        // Create BasicInfo row with file links and other fields
        const [createdBasicInfo, user] = await Promise.all([
          prisma.BasicInfo.create({
            data: {
              userId: req.user.id,
              phoneno: data.phoneno.toString(),
              cnic: data.cnic.toString(),
              guardianName: data.guardianName,
              guardianNumber: data.guardianNumber.toString(),
              schoolName: data.schoolName,
              gender: data.gender === "true",
              address: data.address,
              cnicFront: cnicFrontLink,
              cnicBack: cnicBackLink,
              profilePhoto: profilePhotoLink,
            },
          }),
          prisma.user.findUnique({
            where: { id: req.user.id },
          }),
        ]);

        const userInfo = {
          id: user.id,
          email: user.email,
        };

        const accessToken = sign(userInfo, process.env.APP_SECRET);

        const resdata = {
          accessToken: accessToken,
          user: userInfo,
          basicInfo: createdBasicInfo,
        };
        res.apiSuccess(resdata);
      } catch (error) {
        console.error("Wasabi upload error:", error);
        return res.apiError(error.message, "Wasabi upload error", 500);
      }
    });
  } catch (error) {
    console.error(error);
    return res.apiError(error.message, "Internal server error", 500);
  }
};

module.exports.SecondPage = async (req, res) => {
  try {
    upload.fields([
      { name: "stdFront", maxCount: 1 },
      { name: "stdBack", maxCount: 1 },
      // { name: "studentOf", maxCount: 1 },
      // { name: "schoolName", maxCount: 1 },
      // { name: "ambassadorcode", maxCount: 1 },
      // { name: "student_id", maxCount: 1 },
      // { name: "socials", maxCount: 1 },
    ])(req, res, async (err) => {

      if (err) {
        console.error(err);
        return res.apiError(err.message, "File upload error", 400);
      }

      const {studentOf, schoolName, ambassadorcode, student_id, socials} = req.body;
      if (!studentOf) {
        console.error("Invalid request format");
        return res.apiError(null, "studentOf is missing.", 400);        
      }

      const userId = req.user.id;

      // Check if user is available in req object
      if (!userId) {
        console.error("Invalid request format");
        return res.apiError(null, "Invalid request format", 400);
      }

      let validationSchema;

      if (req.body.studentOf === "other") {
        validationSchema = yup.object().shape({
          studentOf: yup.string().trim().required(),
          socials: yup.string().trim().required(),
        });

        try {
          await validationSchema.validate(
            { studentOf: req.body.studentOf, socials: req.body.socials },
            { abortEarly: false, strict: true }
          );
        } catch (err) {
          console.error("Validation Error:", err.errors);
          return res.apiError(err.errors, "Validation Error", 400);
        }

        const [updatedBasicInfo, user] = await Promise.all([
          prisma.BasicInfo.update({
            where: { userId: parseInt(userId) },
            data: {
              studentOf: req.body.studentOf,
              socials: req.body.socials,
              student_id: null,
              schoolName: null,
              ambassadorcode: null,
              stdFront: null,
              stdBack: null,
            },
          }),
          prisma.user.findUnique({
            where: { id: userId },
          }),
        ]);

        const userInfo = {
          id: user.id,
          email: user.email,
        };

        const accessToken = sign(userInfo, process.env.APP_SECRET);
        return res.apiSuccess(
          { updatedBasicInfo, accessToken },
          "BasicInfo updated successfully"
        );
      } else {
        const student_id = req.body.student_id;
        const schoolName = req.body.schoolName;
        const ambassadorcode = req.body.ambassadorcode;

        validationSchema = yup.object().shape({
          student_id: yup.string().trim().required(),
          socials: yup.string().trim().required(),
          schoolName: yup.string().trim().required(),
          ambassadorcode: yup.string().trim().required(),
        });

        try {
          await validationSchema.validate(
            {
              student_id: req.body.student_id,
              schoolName: req.body.schoolName,
              ambassadorcode: req.body.ambassadorcode,
              socials: req.body.socials,
            },
            { abortEarly: false, strict: true }
          );
        } catch (err) {
          console.error("Validation Error:", err.errors);
          return res.apiError(err.errors, "Validation Error", 400);
        }
      }

      if (req.body.studentOf !== "other") {
        let stdFrontLink, stdBackLink;

        const stdFrontFile = req.files["stdFront"]
          ? req.files["stdFront"][0]
          : null;
        const stdBackFile = req.files["stdBack"]
          ? req.files["stdBack"][0]
          : null;

        console.log(stdFrontFile);
        console.log(stdBackFile);
        let fLink, bLink;
        if (stdFrontFile && stdBackFile) {
          try {
            const [stdFrontLink, stdBackLink] = await Promise.all([
              uploadToWasabi(stdFrontFile),
              uploadToWasabi(stdBackFile),
            ]);

            fLink = stdFrontLink;
            bLink = stdBackLink;
          } catch (error) {
            console.error("Wasabi upload error:", error);
            return res.apiError(error.message, "Wasabi upload error", 500);
          }
        }

        const [updatedBasicInfo, user] = await Promise.all([
          prisma.BasicInfo.update({
            where: { userId: parseInt(userId) },
            data: {
              studentOf: req.body.studentOf,
              socials: req.body.socials,
              student_id: req.body.student_id || null,
              schoolName: req.body.schoolName || null,
              ambassadorcode: req.body.ambassadorcode || null,
              stdFront: fLink || null,
              stdBack: bLink || null,
            },
          }),
          prisma.user.findUnique({
            where: { id: userId },
          }),
        ]);

        const userInfo = {
          id: user.id,
          email: user.email,
        };

        const accessToken = sign(userInfo, process.env.APP_SECRET);

        return res.apiSuccess(
          { updatedBasicInfo, accessToken },
          "BasicInfo updated successfully"
        );
      }
    });
  } catch (error) {
    console.error(error);
    return res.apiError(error.message, "Internal server error", 500);
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
    const base64Image = await getSingleImage(fileKey);
    if (base64Image) {
      res.send(base64Image);
      // Embed the image data in an HTML img tag and send it in the response
      // res.send(`<img src="data:image/jpeg;base64,${base64Image}" alt="Image">`);
    } else {
      console.error("Image not found");
      res.status(404).send("Image not found");
      res.apiError("Failed", "Image Not Found", 404);
    }
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.apiError("Failed", "Error retrieving image", 500);
  }
};
