const { verify } = require("jsonwebtoken");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateReg = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.sendStatus(401);
    }

    // Check if the Authorization header has the correct format
    const authHeaderParts = authHeader.split(" ");
    if (authHeaderParts.length !== 2 || authHeaderParts[0] !== "Bearer") {
      return res.sendStatus(401);
    }

    const accessToken = authHeaderParts[1];
    if (!accessToken) {
      return res.sendStatus(401);
    }

    // Verify the access token using your verify function
    const payload = verify(accessToken, process.env.APP_SECRET);

    // Check if the payload contains the necessary information
    if (!payload || !payload.id) {
      return res.sendStatus(401);
    }

    // Retrieve user information from the database
    req.user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    // Check if the user exists
    if (!req.user) {
      return res.sendStatus(401);
    }

    // If the user is a participant, deny access
    if (req.user.isParticipant) {
      return res.sendStatus(401);
    }

    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }
};


module.exports = { validateReg };
