const bodyParser = require('body-parser');
const express= require("express");
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
const bcrypt = require('bcrypt')
const app = express();
const port = process.env.PORT
const responseMiddleware = require("./middlewares/responseFormatter");

app.use(express.json()); // Add this middleware to parse JSON data from requests
app.use(express.urlencoded({ extended: true }));

// Apply response formatting middleware to all routes
app.use(responseMiddleware);
const allowedOrigins = ['https://olympiad.nust.edu.pk', 'https://olympiad-panel.nust.edu.pk', 'https://olympiad-apix.nust.edu.pk'];
const corsOptions = {
/*origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },*/
methods: ['GET', 'PUT', 'POST'],
allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

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

app.post("/add-dummy-data", async (req, res) => {
  try {
    const password = await bcrypt.hash("123456789", 10);
    const admin = await prisma.user.create({
      data: {
        name: "Administrator",
        email: "harris.khan.1596+admin@gmail.com",
        password: password,
        isValidated: true,
        token: 12345,
        isParticipant: false,
      }
      });
      const challan = await prisma.challan.create({
        data: {
          userId: admin.id,
          detail: {},
          netTotal: 0,
          isPaid: "pending",
          paymentProof: "1703659701083-banana.jpg",
        }
      });
      const createdSports = await prisma.sports.createMany({
        data: Array.from({ length: 15 }, (_, index) => ({
          name: `Dummy Sport ${index + 1}`,
          gender: Math.random() < 0.5,
          description: `Dummy Sport Description ${index + 1}`,
          minPlayer: Math.floor(Math.random() * 10),
          maxPlayer: Math.floor(Math.random() * 10) + 10,
          teamCap: 20,
          details: { key: 'value' },
          price: 500,
        })),
      });
      
      const indcreatedSports = await prisma.sports.createMany({
        data: Array.from({ length: 10 }, (_, index) => ({
          name: `Individual Sport ${index + 1}`,
          gender: Math.random() < 0.5,
          description: `Individual Sport Description ${index + 1}`,
          minPlayer: 1,
          maxPlayer: 1,
          teamCap: 20,
          details: { key: 'value' },
          price: 500,
        })),
      });
      
      const indcreatedComp = await prisma.competitions.createMany({
        data: Array.from({ length: 10 }, (_, index) => ({
          name: `Dummy comp ${index + 1}`,
          gender: Math.random() < 0.5,
          description: `Dummy comp Description ${index + 1}`,
          minPlayer: 1,
          maxPlayer: 1,
          teamCap: 20,
          details: { key: 'value' },
          price: 500,
        })),
      });
  
      const createdCompetitions = await prisma.competitions.createMany({
        data: Array.from({ length: 15 }, (_, index) => ({
          name: `Dummy Competition ${index + 1}`,
          description: `Dummy Competition Description ${index + 1}`,
          minPlayer: Math.floor(Math.random() * 10),
          maxPlayer: Math.floor(Math.random() * 10) + 10,
          teamCap: 20,
          details: { key: 'value' },
          price: 500,
          gender: Math.random() < 0.5,
        })),
      });
    // list of users names 
    const names = [
      "John Doe",
      "Jane Doe",
      "Michael Scott",
      "Jim Halpert",
      "Pam Beesly",
      "Dwight Schrute",
      "Stanley Hudson",
      "Angela Martin",
      "Kevin Malone",
      "Toby Flenderson",
      "Creed Bratton",
      "Kelly Kapoor",
      "Ryan Howard",
      "Darryl Philbin",
      "Meredith Palmer",
      "Oscar Martinez",
      "Kevin Malone"
    ]
    const binfostatus = ["pending", "rejected", "verified", "ban"];
    const stdof =["nust", "uni", "college", "school", "other"];
    const socials = ["nosocials", "qawali", "concert", "all"];
    names.forEach(async (name) => {
      const user = await prisma.user.create({
        data: {
          name: name,
          email: `${name.toLowerCase().split(' ').join('')}@gmail.com`,
          password: password,
          isValidated: true,
          token: 12345,
          isParticipant: true,
        }
        });
    //   const user = await prisma.user.findUnique({ where: { name } });  
      const basicInfo = await prisma.basicInfo.create({
          data: {
            // name: name,
            userId: user.id,
            status: binfostatus[Math.floor(Math.random() * binfostatus.length)],
            accomodation: Math.random() < 0.5,
            phoneno: "03325384528" + Math.floor(Math.random() * 10),
            // Math.floor(Math.random() * 1000000000),
            cnic: `${()=>Math.floor(Math.random() * 100000)}-${()=>Math.floor(Math.random() * 10000000)}-${()=>Math.floor(Math.random() * 10)}`,
            gender: Math.random() < 0.5,
            profilePhoto: "1704467354290-Class Dia.png",
            guardianName: `guardian of ${name}`,
            guardianNumber: `${()=>Math.floor(Math.random() * 100000)}-${()=>Math.floor(Math.random() * 10000000)}-${()=>Math.floor(Math.random() * 10)}`,
            address: `address of ${name}`,
            cnicFront: "1704467354290-Class Dia.png",
            cnicBack: "1704467354290-Class Dia.png",
            studentOf: stdof[Math.floor(Math.random() * stdof.length)],
            student_id: `${()=>Math.floor(Math.random() * 1000000)}`,
            schoolName: `school of ${name}`,
            ambassadorcode: `${Math.floor(Math.random() * 100000)}`,
            stdFront: "1704467354290-Class Dia.png",
            stdBack: "1704467354290-Class Dia.png",
            socials: socials[Math.floor(Math.random() * socials.length)],

          }
        });
        
    });
    const allusers = await prisma.user.findMany();
      res.json({
        message: "Data seeded successfully",
        data: {
          createdCompetitions,
          createdSports,
          indcreatedComp,
          admin,
          indcreatedSports,
          challan,
          allusers
        }
      });
        
  } catch (error) {
    console.error(error);
  }
})

app.post('/add-basicInfo', async (req, res)=>{
  try {
    const allUsers = await prisma.user.findMany({
      where : {
        isParticipant : true
      },
      select : {
        id : true
      }
    });

    const ids = allUsers.map((user)=>user.id);
    const binfostatus = ["pending", "rejected", "verified", "ban"];
    const stdof =["nust", "uni", "college", "school", "other"];
    const socials = ["nosocials", "qawali", "concert", "all"];
    const name = "abc";
    const basicInfos = [];


    await ids.forEach(async(id)=>{

      const basicInfo = await prisma.basicInfo.create({
        data: {
          // name: name,
          userId: id,
          status: binfostatus[Math.floor(Math.random() * binfostatus.length)],
          accomodation: Math.random() < 0.5,
          phoneno: "03325384528" + Math.floor(Math.random() * 10),
          // Math.floor(Math.random() * 1000000000),
          cnic: `${()=>Math.floor(Math.random() * 100000)}-${()=>Math.floor(Math.random() * 10000000)}-${()=>Math.floor(Math.random() * 10)}`,
          gender: Math.random() < 0.5,
          profilePhoto: "1704467354290-Class Dia.png",
          guardianName: `guardian of ${name}`,
          guardianNumber: `${()=>Math.floor(Math.random() * 100000)}-${()=>Math.floor(Math.random() * 10000000)}-${()=>Math.floor(Math.random() * 10)}`,
          address: `address of ${name}`,
          cnicFront: "1704467354290-Class Dia.png",
          cnicBack: "1704467354290-Class Dia.png",
          studentOf: stdof[Math.floor(Math.random() * stdof.length)],
          student_id: `${()=>Math.floor(Math.random() * 1000000)}`,
          schoolName: `school of ${name}`,
          ambassadorcode: `${Math.floor(Math.random() * 100000)}`,
          stdFront: "1704467354290-Class Dia.png",
          stdBack: "1704467354290-Class Dia.png",
          socials: socials[Math.floor(Math.random() * socials.length)],

        }
      });

      basicInfos[id] = basicInfo;
    })

    res.json({ids, basicInfos});

  } catch (error) {
    console.error(error);
  }
})

app.get("/",(req,res)=>{
res.send("app is working")
});

app.listen(port,console.log(`Listening on port ${port}...`));
