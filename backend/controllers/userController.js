const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

// 1) get all users
module.exports.allUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where : {
        isParticipant : true
      },
      include: {
        basicInfo:true
      }
    });

    res.apiSuccess(users);

  } catch (error) {
    res.apiError(error.message, 'Internal Server Error', 500);
  }
};

module.exports.getUser = async (req, res) => {
  const {id} = req.params;
  try {
    const users = await prisma.user.findMany({
      where : {
        isParticipant : true,
        id: parseInt(id)
      },
      include: {
        basicInfo:true
      }
    });

    res.apiSuccess(users);

  } catch (error) {
    res.apiError(error.message, 'Internal Server Error', 500);
  }
};