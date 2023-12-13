const express = require('express')
const router = express.Router()
const achievementsController = require('../controllers/achievementsController')

router.route('/')
    .get(achievementsController.getAllCrowns)

router.route('/:id')
    .get(achievementsController.getTrophyById)

router.route('/loginachiev')
    .patch(achievementsController.updateLoginAchiev)
router.route('/start')
    .patch(achievementsController.updatestartAchievement)

router.route('/loginachievcomplete')
    .patch(achievementsController.updateLoginTracker)

router.route('/rank/:timeScale')
    .get(achievementsController.getRankedPosts)

router.route('/displayCase')
    .patch(achievementsController.updateDisplayCase)

module.exports = router