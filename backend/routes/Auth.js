const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth');
const {auth, register, login} = require('../controllers/authController')


router.get('/auth',validateToken,auth)
router.post('/register',register)
router.post('/login',login)
module.exports = router
