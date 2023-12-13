const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true
          },
          text: {
            type: String,
            required: true
          },
          slug: {
            type: String,
            required: true
          },
          post: {
            type: String,
            required: true
          },
          likes: {
            type: Number,
            default: 0
          },
          stars: {
            type: Number,
            default: 0
          },
          comments: {
            type: Number,
            default: 0
          },
          createdAt: {
            type: Date,
            default: Date.now
          }
    }
)

module.exports = mongoose.model('Comment', commentSchema)