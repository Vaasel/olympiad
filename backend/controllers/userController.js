const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

// 1) get all users
module.exports.allUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
  
      res.json({status:true,  data: users});

    } catch (error) {
      res.status(500).json({ status:false, message: error.message });
    }
  };