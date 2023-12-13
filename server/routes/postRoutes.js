const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController')

router.route('/')
  .get(postsController.getAllPost)
  .post(postsController.createNewPost)

router.route('/stream/:slug').get(postsController.getStreamPost)

router.route('/comment')
  .patch(postsController.updateCommentCount)

router.route('/tags')
  .get(postsController.getAllTags)

router.route('/:id').patch(postsController.updatePost)
router.route('/:id').delete(postsController.deletePost)

router.route('/modal/:id').get(postsController.getSinglePost)

module.exports = router