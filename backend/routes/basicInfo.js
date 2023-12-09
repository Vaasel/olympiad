const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth');
const { getImage, basicDisplay, basicInfoUpdate, SecondPage, basicInfoCreate, setStatus, 
    ApplyAccomodation, getAllUserDetails, getSingleUserDetails } = require('../controllers/basicController');
const { validateReg } = require('../middlewares/regAuth');


// router.get('/auth',validateToken,auth)
// router.post('/register',register)
router.post('/basicinfoCreate',validateToken, basicInfoCreate)
router.post('/basicSecondPage',validateToken, SecondPage)
router.put('/basicinfoupdate',validateToken,basicInfoUpdate)
router.get('/basicinfo',validateToken, getImage)
router.get('/basicDisplay',validateToken, basicDisplay)
router.post('/basicSetStatus',validateReg, setStatus)
router.post('/basicApplyAccomodation',validateToken, ApplyAccomodation)
router.get('/basicAllUsers',validateReg, getAllUserDetails)
router.get('/basicSingleUser',validateReg, getSingleUserDetails)

module.exports = router
