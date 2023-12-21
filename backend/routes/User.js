const express = require('express')
const router = express.Router()
const { validateReg } = require('../middlewares/regAuth');
const {allUsers, getUser} = require('../controllers/userController')


router.get('/allUsers', validateReg,allUsers)
router.get('/getUser/:id', validateReg,getUser)

module.exports = router