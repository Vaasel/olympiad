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






module.exports.CalculateChallan = async (req, res) => {
    try {
      const userId = req.user.id;
  
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
      }));
      
      const sportsPrices = getTeamPrices(sportsTeams);
      const competitionPrices = getTeamPrices(competitionTeams);

      const details = [...sportsPrices, ...competitionPrices];




      res.json({
        userId: userId,
        totalSportsPrice: totalSportsPrice,
        totalCompetitionsPrice: totalCompetitionsPrice,
        totalPrice: totalPrice,
        details: details,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

  


  module.exports.CreateChallan = async (req, res) => {
    try {
      const userId = req.user.id;
  
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
      }));
      
      const sportsPrices = getTeamPrices(sportsTeams);
      const competitionPrices = getTeamPrices(competitionTeams);

      const details = [...sportsPrices, ...competitionPrices];


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


      res.json({
        userId: userId,
        totalSportsPrice: totalSportsPrice,
        totalCompetitionsPrice: totalCompetitionsPrice,
        netTotal: netTotal,
        challan: createdChallan,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  