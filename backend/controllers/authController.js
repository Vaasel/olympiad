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
      subject: "Test Email from Nodemailer",
      html: `<h1>Mail Confirmation</h1><p>Your email verification code is <br/><h2><code>${user.token}</code></h2></p>`,
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
      email: user.email,
      profilePicture: user.profilePicture,
      verified: user.verified,
    };

    const accessToken = sign(
      { id: userInfo.id, email: userInfo.email },
      process.env.APP_SECRET,
      { expiresIn: process.env.JWT_EXPRIES }
    );

    res.json({
      accessToken: accessToken,
      user: userInfo,
    });
  } catch (err) {
    res.apiError(err.message, "Failed", 500);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.apiSuccess(users);
  } catch (err) {
    res.apiError(err.message, "Failed", 500);
  }
};

module.exports.verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      if (user.token == code) {
        user.isValidated = true;
      } else {
        throw new Error("Wrong code entered.");
      }
    } else {
      throw new Error("No user found with this email.");
    }

    res.apiSuccess(user, "Email verified successfully");
  } catch (error) {
    res.apiError(error.message, "Failed", 500);
  }
};
