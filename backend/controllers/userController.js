const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

// 1) get all users
module.exports.allUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.apiSuccess(users);

  } catch (error) {
    res.apiError(error.message, 'Internal Server Error', 500);
  }
};