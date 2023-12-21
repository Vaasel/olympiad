const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const yup = require("yup");
require('yup-password')(yup);
const { sign,verify } = require('jsonwebtoken');
require('dotenv').config();
const { validateToken } = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Store the file buffer in memory
const {transporter} = require("../utils/mailer");


const prisma = new PrismaClient();



module.exports.getAllFAQs = async (req, res) => {
    try {
        const faqs = await prisma.FAQ.findMany();
        res.apiSuccess(faqs);
      } catch (error) {
        console.error(error);
        res.apiError(error.message, 'Internal Server Error', 500);
      }
}


module.exports.CreateFAQ = async (req, res) => {
    const { question, answer, category } = req.body;
    try {
      // Create a new FAQ entry
      const newFAQ = await prisma.fAQ.create({
        data: {
          question,
          answer,
          category,
        },
      });
      res.apiSuccess(newFAQ);
    } catch (error) {
      console.error(error);
      res.apiError(error.message, 'Internal Server Error', 500);
    }

}


module.exports.getAllChallans = async (req, res) => {
  try {
    const Challans = await prisma.Challan.findMany({
      where: {
        NOT: {
          id: 1
        }
      },
      include: {
        user: true
      }
    });

    res.apiSuccess(Challans);
  } catch (err) {
    res.apiError(err.message, 'Internal Server Error', 500);
  }
};


module.exports.setStatus = async (req,res) => {
    const data = req.body;
  
    console.log(data.userId);
    const id = data.userId;
    // const entry = await prisma.BasicInfo.findUnique({
    //   where: { userId: data.userId},
    // });
  
    const user = await prisma.user.findUnique({
        where: {
          id: data.userId,
        }
      });
    
    
    const updatedStatusChallan = await prisma.Challan.update({
      where: { id: data.id },
      data: {
        isPaid: data.isPaid,
      },
    });


    const mailOptions = {
        from: "info.olympiad@nust.edu.pk",
        to: user.email, // Email address you want to send the email to
        subject: "Test Email from Nodemailer",
        html: `<div><h1>Status Changed</h1>Your new status is <br/><h2><code>${data.isPaid}</code></h2> and the reason is ${data.reason}</div>`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.send("Error sending email");
        } else {
          console.log("Email sent: " + info.response);
          res.send("Email sent successfully");
        }
      });


      res.apiSuccess(updatedStatusChallan,'Challan updated successfully');
  
  }


module.exports.CalculateChallan = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { challan: true,basicInfo:true },
      });
      const sportsTeams = await prisma.sports_Teams.findMany({
        where: {
          userId: userId,
        },
        include: {
          sport: true,
        },
      });
  
      const competitionTeams = await prisma.competitions_Teams.findMany({
        where: {
          userId: userId,
        },
        include: {
          sport: true,
        },
      });
  
      const totalSportsPrice = sportsTeams.reduce((acc, sportsTeam) => {
        return acc + (sportsTeam.sport.price || 0);
      }, 0);
  
      const totalCompetitionsPrice = competitionTeams.reduce((acc, competitionTeam) => {
        return acc + (competitionTeam.sport.price || 0);
      }, 0);
  
      const totalPrice = totalSportsPrice + totalCompetitionsPrice;
  
      const getTeamPrices = (teams) => teams.map(team => ({
        id: team.sport.id,
        name: team.sport.name,
        price: team.sport.price,
        isIndividual: team.sport.minPlayer == 1 && team.sport.maxPlayer == 1
      }));
      
      const sportsPrices = getTeamPrices(sportsTeams);
      const competitionPrices = getTeamPrices(competitionTeams);

      const details = [...sportsPrices, ...competitionPrices];
      if (user && user.challan === null) {
        const registrationPrice = user.basicInfo && user.basicInfo.studentOf === "nust" ? 500 : 1000;
      
        details.push({
          id: 0,
          name: "Registration",
          price: registrationPrice,
          isIndividual: false,
        });
      }



      res.apiSuccess({
        userId: userId,
        totalSportsPrice: totalSportsPrice,
        totalCompetitionsPrice: totalCompetitionsPrice,
        totalPrice: totalPrice,
        details: details,
      });
    } catch (error) {
      console.error(error);
      res.apiError(error.message, 'Internal Server Error', 500);
    }
  };

  


  module.exports.CreateChallan = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { challan: true,basicInfo:true },
      });
      // Calculate total amount for sports teams
      const sportsTeams = await prisma.sports_Teams.findMany({
        where: {
          userId: userId,
          challanId: 1,
        },
        include: {
          sport: true,
        },
      });
  
      const totalSportsPrice = sportsTeams.reduce((acc, sportsTeam) => {
        return acc + (sportsTeam.sport.price || 0);
      }, 0);
  
      // Calculate total amount for competition teams
      const competitionTeams = await prisma.competitions_Teams.findMany({
        where: {
          userId: userId,
          challanId: 1,
        },
        include: {
          sport: true,
        },
      });
  
      const totalCompetitionsPrice = competitionTeams.reduce((acc, competitionTeam) => {
        return acc + (competitionTeam.sport.price || 0);
      }, 0);

      const netTotal = totalSportsPrice + totalCompetitionsPrice;

      const getTeamPrices = (teams) => teams.map(team => ({
        id: team.sport.id,
        name: team.sport.name,
        price: team.sport.price,
        isIndividual: team.sport.minPlayer == 1 && team.sport.maxPlayer == 1
      }));
      
      const sportsPrices = getTeamPrices(sportsTeams);
      const competitionPrices = getTeamPrices(competitionTeams);

      const details = [...sportsPrices, ...competitionPrices];

if (user && user.challan === null) {
  const registrationPrice = user.basicInfo && user.basicInfo.studentOf === "nust" ? 500 : 1000;

  details.push({
    id: 0,
    name: "Registration",
    price: registrationPrice,
    isIndividual: false,
  });
}

      const createdChallan = await prisma.challan.create({
        data: {
          userId: userId,
          detail: details || null,
          netTotal: netTotal,
          sportsTeam: {
            connect: sportsTeams.map((team) => ({ id: team.id })),
          },
          competitionsTeams: {
            connect: competitionTeams.map((team) => ({ id: team.id })),
          },
          paymentProof: req.body.paymentProof,
        },
      });


      res.apiSuccess({
        userId: userId,
        totalSportsPrice: totalSportsPrice,
        totalCompetitionsPrice: totalCompetitionsPrice,
        netTotal: netTotal,
        challan: createdChallan,
      });
    } catch (error) {
      console.error(error);
      res.apiError(error.message, 'Internal Server Error', 500);
    }
  };
  

  module.exports.getChallan = async (req, res) => {
    try {
      const {id} = req.params;

      const Challans = await prisma.Challan.findFirst({
        where: {
            id : parseInt(id)
        },
        include: {
          user: true
        }
      });
  
      res.apiSuccess(Challans);
    } catch (err) {
      res.apiError(err.message, 'Internal Server Error', 500);
    }
  };
  