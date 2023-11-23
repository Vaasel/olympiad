const bodyParser = require('body-parser');
const express= require("express");
const { PrismaClient } = require('@prisma/client');
const app = express();


app.use(express.json()); // Add this middleware to parse JSON data from requests
app.use(express.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
res.send("app is working")
});

//routes
const authRoute = require('./routes/Auth')
const userRoute = require('./routes/User')



app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)


const port = 5002
app.listen(port,console.log(`Listening on port ${port}...`));
