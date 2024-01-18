const bodyParser = require('body-parser');
const express= require("express");
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
const app = express();
const port = process.env.PORT
const responseMiddleware = require("./middlewares/responseFormatter");

app.use(express.json()); // Add this middleware to parse JSON data from requests

// Apply response formatting middleware to all routes
app.use(responseMiddleware);
app.use(cors());

//routes
const authRoute = require('./routes/Auth')
const basicRoute = require('./routes/basicInfo')
const userRoute = require('./routes/User')
const sportsRoute = require('./routes/sports')

const competitionsRoute = require('./routes/competitions')

const challanRoute = require('./routes/Challan')




app.use('/api/auth',authRoute)
app.use('/api/basic',basicRoute)
app.use('/api/user',userRoute)
app.use('/api/sports',sportsRoute)

app.use('/api/competitions',competitionsRoute)

app.use('/api/challan',challanRoute)

app.post('/insertDummyData', async (req, res) => {
    try {
      // Insert dummy data for User and related BasicInfo
      const users = [];
      for (let i = 1; i <= 5; i++) {
        const user = await prisma.user.create({
            data: {
              name: `User${i}`,
              email: `user${i}@example.com`,
              password: 'password123',
              token: 123456 + i,
              isValidated: true,
              isParticipant: true,
              basicInfo: {
                create: {
                  // Remove userId from here
                  status: 'verified',
                  accomodation: true,
                  phoneno: '1234567890',
                  cnic: '1234567890123',
                  guardianName: `Guardian${i}`,
                  guardianNumber: '9876543210',
                  address: `Address${i}`,
                },
              },
            },
          });
          
        users.push(user);
      }
  
      const sportsTeam = await prisma.sports_Teams.create({
        data: {
          name: 'TeamA',
          userId: 1,
          sportsId: 1,
          code: 'ABC123',
          challanId: 1, // Replace with a valid challanId
          // ... other fields
        },
      });
      
      // Insert dummy data for Sports and related Sports_Teams
      const sports = [];
      for (let i = 1; i <= 5; i++) {
        const sport = await prisma.sports.create({
          data: {
            name: `Sport${i}`,
            gender: true,
            description: `Description for Sport${i}`,
            minPlayer: 11,
            maxPlayer: 22,
            teamCap: 5,
            details: { key: `value${i}` },
            price: 50 + i,
            team: {
              create: {
                name: `Team${i}`,
                userId: i,
                code: `ABC${i}`,
              },
            },
          },
          include: {
            team: true,
          },
        });
        sports.push(sport);
      }
  
      // Insert dummy data for Competitions and related Competitions_Teams
      const competitions = [];
      for (let i = 1; i <= 5; i++) {
        const competition = await prisma.competitions.create({
          data: {
            name: `Competition${i}`,
            gender: false,
            description: `Description for Competition${i}`,
            minPlayer: 2,
            maxPlayer: 10,
            teamCap: 10,
            details: { key: `value${i}` },
            price: 25 + i,
            competitionTeams: {
              create: {
                name: `Team${i}`,
                userId: i,
                code: `XYZ${i}`,
              },
            },
          },
          include: {
            competitionTeams: true,
          },
        });
        competitions.push(competition);
      }
  
      // Insert dummy data for FAQ
      const faqs = [];
      for (let i = 1; i <= 5; i++) {
        const faq = await prisma.fAQ.create({
          data: {
            question: `Question${i}`,
            answer: `Answer for Question${i}`,
            category: 'General',
          },
        });
        faqs.push(faq);
      }
  
      res.json({
        users,
        sports,
        competitions,
        faqs,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get("/",(req,res)=>{
res.send("app is working")
});

app.listen(port,console.log(`Listening on port ${port}...`));
