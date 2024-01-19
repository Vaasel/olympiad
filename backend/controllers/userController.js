const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

// 1) get all users
module.exports.allUsers = async (req, res) => {
  try {
    let users = await prisma.user.findMany({
      where: {
        isParticipant: true,
        NOT: {
          basicInfo: null,
        },
      },
      include: {
        basicInfo: true,
      },
    });

    // Filter out users with null studentOf value
    users = users.filter((user) => user.basicInfo && user.basicInfo.studentOf !== null);

    // Add validation for users here
    if (!users || users.length === 0) {
      return res.apiError('No users found', 'Not Found', 404);
    }

    res.apiSuccess(users);
  } catch (error) {
    res.apiError(error.message, 'Internal Server Error', 500);
  }
};

module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Add validation for id here
    if (!id || isNaN(id)) {
      return res.apiError('Invalid user ID', 'Bad Request', 400);
    }

    const users = await prisma.user.findUnique({
      where: {
        isParticipant: true,
        id: parseInt(id),
      },
      include: {
        basicInfo: true,
      },
    });

    // Add validation for users here
    if (!users || users.length === 0) {
      return res.apiError('User not found', 'Not Found', 404);
    }

    res.apiSuccess(users);
  } catch (error) {
    res.apiError(error.message, 'Internal Server Error', 500);
  }
};