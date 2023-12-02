const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth');
const { basicInfo } = require('../controllers/basicController');


// router.get('/auth',validateToken,auth)
// router.post('/register',register)
router.post('/basicinfo',validateToken, basicInfo)
module.exports = router
