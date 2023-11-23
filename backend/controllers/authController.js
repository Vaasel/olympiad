const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const yup = require("yup");
require('yup-password')(yup);
const { sign } = require('jsonwebtoken');
require('dotenv').config();


const prisma = new PrismaClient();
// get all users data
module.exports.getUsers = async (req, res) => {
  try{
    const users = await prisma.user.findMany();
    res.json({
      users: users,
    });
  }
catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

//1) testing auth 
module.exports.auth = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        email: true,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({
      user: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2) Register 
module.exports.register = async (req, res) => {
  let data = req.body;
  // Validate request body
  let validationSchema = yup.object().shape({
    name:yup.string().trim().required(),
    email: yup.string().trim().email().max(50).required(),
    password: yup.string().trim().minUppercase(1, 'Password must have at least 1 Uppercase letter').minLowercase(1, 'Password must have at least 1 Lowercase letter').minNumbers(3, 'Password must have at least 3 Numbers').minSymbols(1, 'Password must have at least 1 Special Character').required(),
  });

  try {
    await validationSchema.validate(data, { abortEarly: false, strict: true });
  } catch (err) {
    res.status(400).json({ errors: err.errors });
    return;
  }

  // Trim string values
  data.email = data.email.trim().toLowerCase();
  data.password = data.password.trim();


  try {
    // Check email
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      res.status(400).json({ message: "Email already exists." });
      return;
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name:data.name,
        email: data.email,
        password: hashedPassword
      },
    });

    res.json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "internal server error" });
  }
};

//3) Login
module.exports.login = async (req, res) => {
  let data = req.body;

  let validationSchema = yup.object().shape({
    email: yup.string().trim().email().max(50).required(),
    password: yup.string().trim().min(1).max(250).required(),
  });
  try {
    await validationSchema.validate(data, { abortEarly: false, strict: true });
  } catch (err) {
    res.status(400).json({ errors: err.errors });
    return;
  }
  // Trim string values
  data.email = data.email.trim().toLowerCase();
  data.password = data.password.trim();

  try {
    // Check email and password
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      res.status(400).json({ message: "Email or password is not correct." });
      return;
    }

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) {
      res.status(400).json({ message: "Email or password is not correct." });
      return;
    }

    // Return user info
    const userInfo = {
      id: user.id,
      email: user.email,
      profilePicture: user.profilePicture,
      verified: user.verified,
    };

    const accessToken = sign(userInfo, process.env.APP_SECRET);

    res.json({
      accessToken: accessToken,
      user: userInfo,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

