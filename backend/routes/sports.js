const express = require('express')
const { allSports, genderSingleSports, genderTeamSports, applyIndividualSport, createTeam, joinTeam, getMembers, addSport, withdrawSingleSport, withdrawTeamSport } = require('../controllers/sportsController')
const { validateToken } = require('../middlewares/auth');
const { validateReg } = require('../middlewares/regAuth');
const router = express.Router()

router.get('/allSports', validateReg, allSports);
router.post('/addSport', validateReg, addSport);

router.get('/genderSingleSports', validateToken, genderSingleSports);
router.get('/genderTeamSports', validateToken, genderTeamSports);
router.post('/applyIndividualSport', validateToken, applyIndividualSport);
router.post('/createTeam', validateToken, createTeam);
router.post('/joinTeam', validateToken, joinTeam);
router.get('/getMembers/:sportId', validateToken, getMembers);
router.post('/withdrawSingleSport', validateToken, withdrawSingleSport);
router.post('/withdrawTeamSport', validateToken, withdrawTeamSport);
module.exports = router
