const { verify } = require("jsonwebtoken");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateReg = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").split(" ")[1];
    if (!accessToken) {
      return res.sendStatus(401);
    }

    const payload = verify(accessToken, process.env.APP_SECRET);
    req.user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    
    if (req.user.isParticipant) {
      return res.sendStatus(401);
    }
    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }
};
module.exports = { validateReg };
