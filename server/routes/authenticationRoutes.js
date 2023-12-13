const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/authenticationController')

router.route('/signup')
    .post(authenticationController.createNewUser)

router.route('/login')
    .post(authenticationController.login)

router.route('/delete')
    .delete(authenticationController.deleteUser)

router.route('/changePassword')
    .post(authenticationController.changePassword)

router.route('/forgotPassword')
    .post(authenticationController.forgotPassword)
router.route('/resetPassword')
    .post(authenticationController.resetPassword)
router.route('/loginSocial')
    .post(authenticationController.loginSocial)

module.exports = router