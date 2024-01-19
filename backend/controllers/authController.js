const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const yup = require("yup");
require("yup-password")(yup);
const { sign } = require("jsonwebtoken");
require("dotenv").config();

const { transporter } = require("../utils/mailer");

const generateCode = () => {
  const min = 100000; // Minimum value for a six-digit number
  const max = 999999; // Maximum value for a six-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const prisma = new PrismaClient();

module.exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (!users || users.length === 0) {
      return res.apiError('No users found', 'Not Found', 404);
    }
    res.apiSuccess(users);
  } catch (err) {
    res.apiError(err.message, "Failed", 500);
  }
};

module.exports.auth = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      }
    });
    if (!user) {
      res.apiError(null, "User not found", 404);
      return;
    }
    res.apiSuccess(user);
  } catch (err) {
    res.apiError(err.message, "Failed", 500);
  }
};

module.exports.register = async (req, res) => {
  let data = req.body;
  let validationSchema = yup.object().shape({
    name: yup.string().trim().required(),
    email: yup.string().trim().email().max(50).required(),
    password: yup
      .string()
      .trim()
      .minUppercase(1, "Password must have at least 1 Uppercase letter")
      .minLowercase(1, "Password must have at least 1 Lowercase letter")
      .minNumbers(3, "Password must have at least 3 Numbers")
      .minSymbols(1, "Password must have at least 1 Special Character")
      .required(),
  });

  try {
    await validationSchema.validate(data, { abortEarly: false, strict: true });
  } catch (err) {
    res.apiError(err.errors, "Validation Failed", 400);
    return;
  }

  data.email = data.email.trim().toLowerCase();
  data.password = data.password.trim();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      res.apiError(null, "Email already exists.", 400);
      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const code = generateCode();

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        isValidated: false,
        token: code,
        isParticipant: true
      },
    });

    const accessToken = sign(
      { id: user.id, email: user.email },
      process.env.APP_SECRET,
      { expiresIn: process.env.JWT_EXPRIES }
    );
    user.accessToken = accessToken;

    const mailOptions = {
      from: "info.olympiad@nust.edu.pk",
      to: user.email,
      subject: "Verification Code for Your Registration",
      html: `<h3>Dear ${user.name},</h3>
      <p>We're thrilled to welcome you to Olympiad'24, where greatness begins!</p>
      <p>To complete the verification process, please enter the following verification code on your account:</p>
      <p><strong>Verification Code: ${code}</strong></p>
      <p>Thank you for registering for Olympiad’24 and choosing to reignite the torch!</p>
      <p>If you have any questions or concerns, please reach out to our support team at <a href="mailto:info.olympiad@nust.edu.pk">info.olympiad@nust.edu.pk</a>.</p>
      <p>Best regards,</p>
	  <p>Olympiad Team</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.apiError("Error sending email", "Failed", 500);
      } else {
        console.log("Email sent: " + info.response);
        res.apiSuccess(user, "Email sent successfully");
      }
    });
  } catch (err) {
    res.apiError(err.message, "Failed", 500);
  }
};

module.exports.login = async (req, res) => {
  let data = req.body;

  let validationSchema = yup.object().shape({
    email: yup.string().trim().email().max(50).required(),
    password: yup.string().trim().min(1).max(250).required(),
  });

  try {
    await validationSchema.validate(data, { abortEarly: false, strict: true });
  } catch (err) {
    res.apiError(err.errors, "Validation Failed", 400);
    return;
  }

  data.email = data.email.trim().toLowerCase();
  data.password = data.password.trim();

  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include:{
        basicInfo:true
      }
    });

    if (!user) {
      res.apiError(null, "Email does not exist.", 400);
      return;
    }

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) {
      res.apiError(null, "Password is not correct.", 400);
      return;
    }

    const userInfo = {
      id: user.id,
      email: user.email
    };

    user.basicInfo = user.basicInfo !== null;

    const accessToken = sign(
      { id: userInfo.id, email: userInfo.email },
      process.env.APP_SECRET,
      { expiresIn: process.env.JWT_EXPRIES }
    );

    res.apiSuccess({
      accessToken: accessToken,
      user: user,
    });
  } catch (err) {
    res.apiError(err.message, "Failed", 500);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    if (!users || users.length === 0) {
      return res.apiError('No users found', 'Not Found', 404);
    }
    res.apiSuccess(users);
  } catch (err) {
    res.apiError(err.message, "Failed", 500);
  }
};

module.exports.verifyEmail = async (req, res) => {
  const { code } = req.body;
  const email = req.user.email;
  if (!code) {
    return res.apiError(null, "Enter code.", 404);
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      if (user.token != code) {
        throw new Error("Wrong code entered.");
      }
    } else {
      throw new Error("No user found with this email.");
    }
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        isValidated: true,
      },
    });

    res.apiSuccess(updatedUser, "Email verified successfully");
  } catch (error) {
    res.apiError(error.message, "Failed", 500);
  }
};
