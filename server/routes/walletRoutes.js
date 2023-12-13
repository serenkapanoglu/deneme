const express = require('express')
const router = express.Router()
const walletControlor = require('../controllers/walletController')

router.route('/')
    .get(walletControlor.getAllWallet)
    .post(walletControlor.createWallet)
router.route('/:id')
    .put(walletControlor.updateWallet)
    .delete(walletControlor.deleteWallet)

module.exports = router
