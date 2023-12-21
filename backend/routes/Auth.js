const express = require('express')
const router = express.Router()
const { validateToken, validateLogin } = require('../middlewares/auth');
const {auth, register, login, getAll, verifyEmail} = require('../controllers/authController')


router.get('/auth',validateLogin,auth)
router.post('/register',register)
router.post('/login',login)
router.get('/getAll',getAll);
router.post('/verifyEmail', validateToken, verifyEmail);
module.exports = router
