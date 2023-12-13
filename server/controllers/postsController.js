const Posts = require('../models/posts.js')
const User = require('../models/User.js')
const Tags = require('../models/tags.js')
const PostRank = require('../models/postranks.js')
const asyncHandler = require('express-async-handler')
const { updateTenStarPostAchievements } = require('./achievementsController.js')

// @desc Get all posts
// @route GET /userprofile
// @access Private, app populates list of posts
const getAllPost = asyncHandler(async (req, res) => {
  // Get all posts from MongoDB
  const posts = await Posts.find().select().lean()
  // If no posts 
  if (!posts?.length) {
    return res.status(400).json({ message: 'No posts found' })
  }
  res.json(posts)
})

const getSinglePost = asyncHandler(async (req, res) => {
  const postId = req.params.id; // Assuming the post ID is passed as a route parameter

  // Get the single post from MongoDB using findById
  const post = await Posts.findById(postId).lean();

  // If no post is found
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
});

const filterPostRanksByTimeScale = (postRanks) => {
  const now = new Date();
  return postRanks.filter((postRank) => {
    const createdAt = new Date(postRank.createdAt);
    if (postRank.time_scale === "daily") {
      return (
        createdAt.getDate() === now.getDate() &&
        createdAt.getMonth() === now.getMonth() &&
        createdAt.getFullYear() === now.getFullYear()
      );
    } else if (postRank.time_scale === "weekly") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay() + 1);
      const endOfWeek = new Date(now);
      endOfWeek.setDate(now.getDate() + (6 - now.getDay()) + 1);
      return createdAt >= startOfWeek && createdAt <= endOfWeek;
    }
    return false;
  });
};

const getStreamPost = asyncHandler(async (req, res) => {
  // Get all posts from MongoDB
  const { slug } = req.params;

  if (!slug) {
    return res.status(404).json({ message: "Slug is required" });
  }

  const user = await User.findOne({ slug });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const aggregationPipelineForFollowing = [
    {
      $match: {
        rank: { $lte: 20 },
        $or: [{ time_scale: "daily" }, { time_scale: "weekly" }],
        slug: { $in: user.following },
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        as: "newPost",
      },
    },
    {
      $unwind: "$newPost",
    },
    {
      $addFields: {
        "newPost._id": "$$REMOVE",
        "newPost.tag": "$$REMOVE",
        "newPost.slug": "$$REMOVE",
        "newPost.tags": "$$REMOVE",
        "newPost.PostTime": "$$REMOVE",
        "newPost.createdAt": "$$REMOVE",
        "newPost.__v": "$$REMOVE",
        "newPost.point": "$$REMOVE",
      },
    },
  ];

  const aggregationPipelineForTags = [
    {
      $match: {
        rank: { $lte: 20 },
        $or: [{ time_scale: "daily" }, { time_scale: "weekly" }],
        "tags.id": {
          $in: user.tagFollowing.map((tag) => tag.tagId),
        },
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        as: "newPost",
      },
    },
    {
      $unwind: "$newPost",
    },
    {
      $addFields: {
        "newPost._id": "$$REMOVE",
        "newPost.tag": "$$REMOVE",
        "newPost.slug": "$$REMOVE",
        "newPost.tags": "$$REMOVE",
        "newPost.PostTime": "$$REMOVE",
        "newPost.createdAt": "$$REMOVE",
        "newPost.__v": "$$REMOVE",
        "newPost.point": "$$REMOVE",
      },
    },
  ];

  const dataFollow = await PostRank.aggregate(aggregationPipelineForFollowing);
  const dataTag = await PostRank.aggregate(aggregationPipelineForTags);

  const postRanks = [];
  let allData = [...dataFollow, ...dataTag];

  allData.map((item) => {
    let newItem = { ...item, ...item.newPost };
    delete newItem.newPost;
    postRanks.push(newItem);
  });

  let TopPost = filterPostRanksByTimeScale(postRanks);


  const uniquePosts = [];
  const seenPosts = new Set();

  TopPost.forEach((item) => {
    if (!seenPosts.has(item.post.toString())) {
      seenPosts.add(item.post.toString());
      uniquePosts.push(item);
    }
  });

  const filteredPosts = await Posts.find({
    $or: [{ NSFW: { $ne: true } }, { NSFW: user.NSFW }],
    $or: [{ slug: { $in: [...user.following, user.slug] } }],
  })
    .sort({ PostTime: -1 })
    .select()
    .lean();


  // If no posts
  if (!filteredPosts?.length && !uniquePosts?.length) {
    return res.status(400).json({ message: "No posts found" });
  }

  const idSet = new Set(filteredPosts.map(item => item._id.toString()));

  const filteredRankPost = uniquePosts.filter((item) => !idSet.has(item.post.toString()));
  filteredRankPost.forEach((item) => {
    item._id = item.post;
  });

  const mergedArray = []
  let frame
  if (filteredPosts.length > filteredRankPost.length) {
    frame = Math.floor(filteredPosts.length / filteredRankPost.length);
    if (frame > 4) {
      frame = 4
    }
    let j = 0;
    for (let i = 0; i < filteredPosts.length; i++) {
      mergedArray.push(filteredPosts[i]);
      if (j < filteredRankPost.length && (i + 1) % frame == 0) {
        mergedArray.push(filteredRankPost[j]);
        j += 1;
      }
    }
  } else {
    frame = Math.floor(filteredRankPost.length / filteredPosts.length);
    if (frame > 4) {
      frame = 4
    }
    let j = 0;
    for (let i = 0; i < filteredRankPost.length; i++) {
      mergedArray.push(filteredRankPost[i]);
      if (j < filteredPosts.length && (i + 1) % frame == 0) {
        mergedArray.push(filteredPosts[j]);
        j += 1;
      }
    }
  }

  res.status(200).json(mergedArray);
});

const getAllTags = asyncHandler(async (req, res) => {
  // Get all posts from MongoDB
  const tags = await Tags.find().select().lean()

  // If no posts 
  if (!tags?.length) {
    return res.status(400).json({ message: 'No tags found' })
  }

  res.json(tags)
})

// @desc Create new post
// @route POST /userprofile
// @access Private, only current user

const createNewPost = asyncHandler(async (req, res) => {
  const { user, text, slug, postimage, collaborator, category, nsfw, remix, profileImage, share, visibility } = req.body;

  // Confirm data
  if (!user || !text || !slug) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const collaboratorObjects = [];

  if (share && collaborator) {
    collaboratorObjects.push({ slug: collaborator.slug, displayName: collaborator.displayName });
  }

  // Convert the array of collaborator objects to an array of slugs
  if (collaborator && Array.isArray(collaborator)) {
    for (const collab of collaborator) {
      const { slug } = collab;
      const collabUser = await User.findOne({ slug }).select('slug displayName');

      if (collabUser) {
        collaboratorObjects.push({ slug: collabUser.slug, displayName: collabUser.displayName });
      }
    }
  }

  /*const tagObjects = [];
  if (tags && Array.isArray(tags)) {
    for (const tag of tags) {
      const { id, tag: tagName } = tag;
      tagObjects.push({ id, tag: tagName });
    }
  }*/

  const postObject = { user, text, slug, category, collaborator: collaboratorObjects, NSFW: nsfw, Remix: remix, postimage, profileImage, share, visibility };
  console.log(postimage);

  // Create and store new post
  const post = await Posts.create(postObject);

  if (!post) {
    return res.status(400).json({ message: 'Invalid post data received' });
  }

  res.status(201).json({
    message: `New post created by ${user}`,
  });
});

// @desc Update a post
// @route PATCH /userprofile
// @access Private, only user who created & admin
const updatePost = asyncHandler(async (req, res) => {
  const { id, user, stars, starDonator, slug, likes, likesUsers, shares, shareUsers } = req.body

  // Confirm data 
  if (!id || !user || !slug) {
    return res.status(400).json({ message: 'Post id and user are required' })
  }

  // Does the post exist to update?
  const post = await Posts.findById(id).exec()

  if (!post) {
    return res.status(400).json({ message: 'Post not found' })
  }

  if (stars && starDonator) {
    post.stars += stars;
    if (!post.starDonator.includes(starDonator)) {
      post.starDonator.push(starDonator);
    }
  }
  console.log('likes:', likes)
  console.log('likesUsers:', likesUsers)
  if (likes && likesUsers) {
    if (likes === 1 && !post.likesUsers.includes(likesUsers)) {
      console.log('1st code ran')
      post.likes += 1;
      post.likesUsers.push(likesUsers);
    }
    if (likes === -1 && post.likesUsers.includes(likesUsers)) {
      console.log('code ran')
      post.likes -= 1;
      post.likesUsers = post.likesUsers.filter(userSlug => userSlug !== likesUsers);
    }
  }

  if (shares && shareUsers) {
    if (shares === 1) {
      console.log('1st code ran share')
      post.shares += 1;
      post.shareUsers.push(shareUsers);
    }
  }

  const updatedPost = await post.save()
  await updateTenStarPostAchievements(slug)
  res.json({ message: `${updatedPost.user}'s post updated` })
})

const updateCommentCount = asyncHandler(async (req, res) => {
  const { id, comments } = req.body

  if (!id || !comments) {
    return res.status(400).json({ message: 'Both id and comments fields are required' })
  }

  const post = await Posts.findById(id).exec()

  if (!post) {
    return res.status(400).json({ message: 'Post not found' })
  }

  post.comments = comments

  const updatedCommentCount = await post.save()

  res.json({ message: `${updatedCommentCount.id} updated` })
})

// @desc Delete a post
// @route DELETE /userprofile
// @access Private, only user who created & admin
const deleteRankedPostIfPostNotExists = async (postId) => {
  try {
    await PostRank.deleteMany({ post: postId });
  } catch (error) {
    console.error('Error deleting rankedposts:', error);
  }
};
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.body

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Post ID Required' })
  }

  // Does the post exist to delete?
  const post = await Posts.findById(id).exec()

  if (!post) {
    return res.status(400).json({ message: 'Post not found' })
  }

  const result = await post.deleteOne()
  await deleteRankedPostIfPostNotExists(id)
  const reply = `Post by ${result.user} with ID ${result.text} deleted`

  res.json(reply)
})

module.exports = {
  getAllPost,
  getAllTags,
  createNewPost,
  updatePost,
  updateCommentCount,
  deletePost,
  getStreamPost,
  getSinglePost
}