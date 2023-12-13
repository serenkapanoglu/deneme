const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        voiting_id: {
            type: String,
            required: true
        },
        star: {
            type: Number,
            required: true
        },
        createdDate: {
            type: Date,
            required: false,
            default: Date.now
        },
        option: {
            type: String,
            required: true
        },
    }
)

module.exports = mongoose.model('Votes', commentSchema)