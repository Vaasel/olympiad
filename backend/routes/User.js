const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth');
const {allUsers} = require('../controllers/userController')


router.get('/allUsers',validateToken,allUsers)

module.exports = router