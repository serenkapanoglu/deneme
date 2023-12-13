const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
    }
)

module.exports = mongoose.model('Wallet', walletSchema)