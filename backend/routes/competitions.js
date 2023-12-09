const express = require('express')
const { validateToken } = require('../middlewares/auth');
const { validateReg } = require('../middlewares/regAuth');
const { allSports, addSport, genderSingleSports, genderTeamSports, applyIndividualSport, createTeam, joinTeam, getMembers, withdrawSingleSport, withdrawTeamSport } = require('../controllers/competitionsController');
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
