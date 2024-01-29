const express = require('express')
const router = express.Router()
const { validateToken, validateLogin } = require('../middlewares/auth');
const {auth, register, login, getAll, verifyEmail, forgotPassword, updatePassword} = require('../controllers/authController')


router.get('/auth',validateLogin,auth)
router.post('/register',register)
router.post('/login',login)
router.get('/getAll',getAll);
router.post('/verifyEmail', validateToken, verifyEmail);
router.post('/forgotPassword',  forgotPassword);
router.post('/updatePassword',  validateToken, updatePassword);
module.exports = router
