const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const usersContextController = require('../controllers/usersContextController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)

router.get('/post/:id', usersContextController.getUserByIdPost)

router.route('/waitlist')
    .post(usersController.createNewMailer)

router.route('/career')
    .post(usersController.createCareerCandidate)

router.get('/:id', usersContextController.getUserById)

router.get('/search', usersController.getAllUsers)

router.route('/displayname')
    .patch(usersController.updateDisplayname)

router.route('/follow')
    .patch(usersController.updateFollowing)

router.route('/unfollow')
    .patch(usersController.updateUnfollowing)
router.route('/support')
    .patch(usersController.updateSupporting)

router.route('/unsupport')
    .patch(usersController.updateUnsupporting)

router.route('/qrcode')
    .patch(usersController.updateQrcode)

router.route('/bio')
    .patch(usersController.updateBio)

router.route('/postTut')
    .patch(usersController.updatePostTut)

router.route('/tutcomplete')
    .patch(usersController.tutcomplete)

router.route('/stars')
    .patch(usersController.updateStars)

router.route('/profpic')
    .patch(usersController.updateProfpic)

router.route('/background')
    .patch(usersController.updateBackgroundpic)

router.route('/join')
    .post(usersController.createNewMailer)

router.patch('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router