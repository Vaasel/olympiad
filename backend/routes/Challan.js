const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth');
const { validateReg } = require('../middlewares/regAuth');
const { CalculateChallan,updateChallan, CreateChallan, getAllChallans, setStatus, getAllFAQs, CreateFAQ, getChallan, getUserChallans } = require('../controllers/challanController');



router.get('/getBill',validateToken, CalculateChallan)
router.get('/getBills',validateToken, getUserChallans)
router.post('/updateChallan',validateToken, updateChallan)
router.post('/generateChallan',validateToken, CreateChallan)
router.get('/getAllChallans',validateReg, getAllChallans)
router.get('/getAllFAQs', getAllFAQs)
router.post('/setStatusChallan',validateReg, setStatus)
router.post('/CreateFAQ',validateReg, CreateFAQ)
router.get('/getChallan/:id',validateReg, getChallan)
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
