const bodyParser = require('body-parser');
const express= require("express");
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const app = express();
const port = process.env.PORT


app.use(express.json()); // Add this middleware to parse JSON data from requests
app.use(express.urlencoded({ extended: false }));


//routes
const authRoute = require('./routes/Auth')
const basicRoute = require('./routes/basicInfo')
const userRoute = require('./routes/User')



app.use('/api/auth',authRoute)
app.use('/api/basic',basicRoute)
app.use('/api/user',userRoute)

app.get("/",(req,res)=>{
res.send("app is working")
});

app.listen(port,console.log(`Listening on port ${port}...`));
