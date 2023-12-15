const bodyParser = require('body-parser');
const express= require("express");
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const app = express();
const port = process.env.PORT
const responseMiddleware = require("./middlewares/responseFormatter");

app.use(express.json()); // Add this middleware to parse JSON data from requests
app.use(express.urlencoded({ extended: false }));

// Apply response formatting middleware to all routes
app.use(responseMiddleware);

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


app.get("/",(req,res)=>{
res.send("app is working")
});

app.listen(port,console.log(`Listening on port ${port}...`));
