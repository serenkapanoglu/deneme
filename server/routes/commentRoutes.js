const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')

router.route('/')
    .get(commentsController.getCommentsByPostId)
    .post(commentsController.createNewComment)
    .patch(commentsController.updateComment)
    .delete(commentsController.deleteComment)

module.exports = router