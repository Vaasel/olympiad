const express = require('express')
const router = express.Router()
const { validateReg } = require('../middlewares/regAuth');
const {allUsers} = require('../controllers/userController')


router.get('/allUsers', validateReg,allUsers)

module.exports = router