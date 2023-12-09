const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth');
const { validateTokenForReg } = require('../middlewares/regAuth');
const { CalculateChallan, CreateChallan } = require('../controllers/challanController');



router.get('/getBill',validateToken, CalculateChallan)
router.post('/generateChallan',validateToken, CreateChallan)
// router.get('/auth',validateToken,auth)
// router.post('/register',register)
// router.post('/basicinfoCreate',validateToken, basicInfoCreate)
// router.post('/basicSecondPage',validateToken, SecondPage)
// router.put('/basicinfoupdate',validateToken,basicInfoUpdate)
// router.get('/basicinfo',validateToken, getImage)
// router.get('/basicDisplay',validateToken, basicDisplay)
// router.post('/basicSetStatus',validateTokenForReg, setStatus)
// router.post('/basicApplyAccomodation',validateToken, ApplyAccomodation)
// router.get('/basicAllUsers',validateTokenForReg, getAllUserDetails)
// router.get('/basicSingleUser',validateTokenForReg, getSingleUserDetails)

module.exports = router
