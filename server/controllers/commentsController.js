const Comments = require('../models/comments.js')
const Posts = require('../models/posts.js')
const asyncHandler = require('express-async-handler')

// @desc Get all comments
// @route GET /userprofile
// @access Private, app populates list of comments
const getCommentsByPostId = asyncHandler(async (req, res) => {
    const { post } = req.query; // Extracting the 'post' query parameter
    // Get comments with the matching postId from MongoDB
    const comments = await Comments.find({ post }).sort({createdAt: -1}).lean();
  
    res.json(comments);
  });

// @desc Create new comment
// @route POST /userprofile
// @access Private, only current user
const createNewComment = asyncHandler(async (req, res) => {
    const { user, text, slug, post, } = req.body;
    console.log(req.body);
  
    // Confirm data
    if (!user || !slug || !text || !post) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const commentObject = { user, text, slug, post };
    // Create and store new post
    const comment = await Comments.create(commentObject);
   
    if (comment) { // Created
      // Find the post and increment the comments value by 1
      await Posts.findOneAndUpdate(
        { _id: post },
        { $inc: { comments: 1 } }
      );
      
      res.status(201).json({ message: comment });
    } else {
      res.status(400).json({ message: 'Invalid comment data received' });
    }
  });

// @desc Update a comment
// @route PATCH /userprofile
// @access Private, only user who created & admin
const updateComment = asyncHandler(async (req, res) => {
    const { id, user, text, image, likes  } = req.body

    // Confirm data 
    if (!id || !user) {
        return res.status(400).json({ message: 'Comment id and user are required' })
    }

    // Does the comment exist to update?
    const comment = await Comments.findById(id).exec()

    if (!comment) {
        return res.status(400).json({ message: 'Comment not found' })
    }

    comment.text = text
    comment.image = image
    comment.likes = likes

    const updatedComment = await comment.save()

    res.json({ message: `${updatedComment.user}'s comment updated` })
})

// @desc Delete a comment
// @route DELETE /userprofile
// @access Private, only user who created & admin
const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Comment ID Required' })
    }

    // Does the comment exist to delete?
    const comment = await Comments.findById(id).exec()

    if (!comment) {
        return res.status(400).json({ message: 'Comment not found' })
    }

    const result = await comment.deleteOne()

    const reply = `Comment by ${result.user} with ID ${result.text} deleted`

    res.json(reply)
})

module.exports = {
    getCommentsByPostId,
    createNewComment,
    updateComment,
    deleteComment
}