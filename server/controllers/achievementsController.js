const asyncHandler = require("express-async-handler");
const Crowns = require("../models/achievements.js");
const User = require("../models/User");
const PostRank = require("../models/postranks.js");
const Post = require("../models/posts");

const getAllCrowns = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const crowns = await Crowns.find().lean()

  // If no users 
  if (!crowns?.length) {
    return res.status(400).json({ message: 'No crowns found' })
  }

  res.json(crowns)
})

const getTrophyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Voiting ID is required' });
    }
    try {
    
  const crowns = await Crowns.findById(id);

  // If no users 
  if (!crowns?.length) {
    return res.status(400).json({ message: 'No crowns found' })
  }
  res.json(crowns)

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'An error occurred while loading trophy' });
}
})

const getRankedPosts = asyncHandler(async (req, res) => {
  try {
    // Get all users from MongoDB
    const { timeScale } = req.params;
    const { tagId } = req.query;

    if (!timeScale) {
      res.status(400).json({
        err: "Tag ID is required",
      });
    }
    if (!tagId) {
      res.status(400).json({
        err: "TIme scale is required",
      });
    }
    
    if (timeScale !== "all") {
      const rankedPostData = []
      const filter = { time_scale: timeScale };
      if (tagId !== "all") {
        filter["tags.id"] = tagId
      }
      const timeNow = new Date();
      if (timeScale === "daily") {
        filter.createdAt = {
            $gte: new Date(timeNow.getFullYear(),timeNow.getMonth(),timeNow.getDate(),0,0,0),
            $lt: new Date(timeNow.getFullYear(),timeNow.getMonth(),timeNow.getDate() + 1,0,0,0),
        };
      } else if (timeScale === "weekly") {
        const startOfWeek = new Date(timeNow);
        startOfWeek.setDate(timeNow.getDate() - timeNow.getDay() + 1);
        const endOfWeek = new Date(timeNow);
        endOfWeek.setDate(timeNow.getDate() - timeNow.getDay() + 8);
        filter.createdAt = {
            $gte: startOfWeek,
            $lt: endOfWeek,
        };
      } else if (timeScale === "monthly") {
        filter.createdAt = {
            $gte: new Date(timeNow.getFullYear(),timeNow.getMonth(),1,0,0,0),
            $lt: new Date(timeNow.getFullYear(),timeNow.getMonth() + 1,1,0,0,0),
        };
      } else if (timeScale === "yearly") {
        filter.createdAt = {
            $gte: new Date(timeNow.getFullYear(), 0, 1, 0, 0, 0),
            $lt: new Date(timeNow.getFullYear() + 1, 0, 1, 0, 0, 0),
        };
      }
      const aggregationPipeline = [
        {
          $match: filter,
        },
        {
          $lookup: {
            from: "posts",
            localField: "post",
            foreignField: "_id",
            as: "post"
          }
        },
        { $sort: { point: -1 } },
      ];

      const ranked = await PostRank.aggregate(aggregationPipeline);

      for (let index = 0; index < ranked.length; index++) {
        const item = ranked[index];
        console.log(item)
        //const post = await Post.findOne({ _id: item.post });
        rankedPostData.push({
          //...post.toObject(),
          ...item.post[0],
          time_scale: ranked[index].time_scale,
          rank: index + 1,
        });
      } 

      res.status(200).json(rankedPostData);
    } else {
      if (tagId == "all") {
        let rankedPost = await Post.find().select().sort({ point: -1 }).lean();
        rankedPost.forEach((post, idx)=> post.rank = idx + 1)
        res.status(200).json(rankedPost)  
      }else{
        const aggregationPipeline = [
          {
            $match: {
              "tags.id": tagId, 
            },
          },
          { $sort: { point: -1 } }, 
        ];
        let rankedPost = await Post.aggregate(aggregationPipeline);
        rankedPost.forEach((post, idx)=> post.rank = idx + 1)
        res.status(200).json(rankedPost);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "No ranked posts found", error: error });
  }
});

const updateLoginAchiev = asyncHandler(async (req, res) => {
  const { progress, slug } = req.body;

  if (!slug || !progress) {
    return res.status(400).json({ message: "Progess value, and user slug fields are required" });
  }

  const user = await User.findOne({ slug }).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  console.log(user.achievements[1].progress)
  if (progress === 1) {
    user.achievements[1].progress += 1
  } else if (progress === 2) {
    user.achievements[1].progress = 0
  };

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

const updateLoginTracker = asyncHandler(async (req, res) => {
  const { id, consecutivelogins, lastlogin, achievcomplete } = req.body

  // Confirm data 
  if (!id) {
    return res.status(400).json({ message: 'id required' })
  }

  // Does the user exist to update?
  const user = await User.findOne({ slug: id }).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  if (consecutivelogins && lastlogin) {
    user.achievements[1].progress = consecutivelogins;
    user.lastlogin = lastlogin;
  } else if (achievcomplete) {
    user.achievements[1].complete = achievcomplete
    user.achievements[1].progress = 1
  };
  console.log(consecutivelogins)
  console.log(lastlogin)
  console.log(user.achievements[1].complete)

  const updatedUser = await user.save()

  res.status(200).json(updatedUser);
})

const pipeline = [{ $match: { operationType: { $in: ['insert', 'update', 'delete'] } } }];

const changeStream = Post.watch(pipeline);
changeStream.on("change", async () => {
  await updateAllPostPoints();
});


// const rankPosts = async () => {
//   Post.find({}, async (err, posts) => {
//     if (err) {
//       console.error(err);
//     } else {
//       // Sort posts by stars in descending order
//       posts.sort((a, b) => b.stars - a.stars);
//       const rankPosts = await getPostRankByTagId();

//       // Loop through posts and sort by likes and time created for posts with same number of stars
//       // let prevStars = -1;
//       // let prevLikes = -1;
//       // let prevCreatedAt;
//       // let rank = 1;
//       const rankedPostsData = posts.map((post) => {
//         // if (post.stars < prevStars) {
//         //   rank++;
//         // }
//         // if (post.stars === prevStars) {
//         //   if (post.likes < prevLikes) {
//         //     rank++;
//         //   } else if (
//         //     post.likes === prevLikes &&
//         //     post.createdAt < prevCreatedAt
//         //   ) {
//         //     rank++;
//         //   }
//         // }
//         // prevStars = post.stars;
//         // prevLikes = post.likes;
//         // prevCreatedAt = post.createdAt;
//         const currentPostRank = rankPosts.find(
//           (item) => item._id.toString() === post._id.toString()
//         );
//         // Update the highestrank and currentrank fields for the post if their ranks have improved
//         const update = {};
//         if (
//           !post.highestrank ||
//           currentPostRank.filterRank < post.highestrank
//         ) {
//           update.highestrank = currentPostRank.filterRank;
//         }
//         if (
//           !post.currentrank ||
//           currentPostRank.filterRank !== post.currentrank
//         ) {
//           update.currentrank = currentPostRank.filterRank;
//         }
//         if (!post.point || currentPostRank.point !== post.point) {
//           update.point = currentPostRank.point;
//         }

//         // Return an object with the post data and the update operation
//         return {
//           post,
//           update,
//         };
//       });

//       // Update the highestrank and currentrank fields for each post in the posts collection
//       rankedPostsData.forEach((data) => {
//         const { post, update } = data;
//         if (Object.keys(update).length > 0) {
//           Post.updateOne({ _id: post._id }, { $set: update }, (err) => {
//             if (err) {
//               console.error(err);
//             }
//           });
//         }
//       });

//       // Store the array of ranked posts in the collection rankedposts
//       rankedposts.deleteMany({}, (err) => {
//         if (err) {
//           console.error(err);
//         } else {
//           // const rankedPosts = rankedPostsData.map((data, index) => ({
//           //   ...data.post.toObject(),
//           //   rank: data.post.toObject().currentrank,
//           // }));
//           // rankedposts.insertMany(rankedPosts, (err, docs) => {
//           //   if (err) {
//           //     console.error(err);
//           //   } else {
//           //     console.log(`Ranked ${docs.length} posts`);
//           //     // call updateAchievements function at the end of rankPosts function
//           //     updateAchievements();
//           //   }
//           // });
//         }
//       });
//     }
//   });
// };

const updateAllPostPoints = async () => {
  try {
    const posts = await Post.find();

    for (const post of posts) {
      const point =
        post.likes * 1 + post.comments * 3 + post.shares * 4 + post.stars * 10;
      post.point = point;
      await post.save();
    }
    console.log("Updated points for all posts.");
  } catch (error) {
    console.error("Error updating points for all posts:", error);
  }
};


// function updateAchievements() {
//   console.log("running");
//   try {
//     User.find({}, (err, users) => {
//       if (err) {
//         console.error(err);
//       } else {
//         users.forEach((user) => {
//           Post.findOne(
//             { slug: user.slug, currentrank: { $gt: 10 } },
//             {},
//             { sort: { currentrank: 1 } },
//             (err, closestPost) => {
//               if (err) {
//                 console.error(err);
//               } else {
//                 const progress = closestPost ? closestPost.currentrank - 10 : 0;
//                 user.achievements[2].progress = progress >= 0 ? progress : 0;
//                 user.save((err) => {
//                   if (err) {
//                     console.error(err);
//                   }
//                 });
//               }
//             }
//           );
//         });
//       }
//     });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// }

function calculateProgress(rank) {
  if (rank <= 20) {
    return 7.5
  }else if (rank <= 30) {
    return 5
  } else if (rank <= 40) {
    return 2.5
  }{
    return 0
  }
}

const updateWeeklyRankAchievements = async () => {
  console.log("Running Update Top 10 Weekly Ranking Achievements");
  try {
    const users = await User.find().exec();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (const user of users) {
      if (user.slug) {
        const postRanks = await PostRank.find({
          slug: user.slug,
          time_scale: "weekly",
          rank: { $lte: 10 },
          createdAt: { $gte: today },
        }).exec();

        user.achievements[2].complete += postRanks.length;

        const postRankProgress = await PostRank.findOne({
          slug: user.slug,
          time_scale: "weekly",
          rank: { $gt: 10 },
          createdAt: { $gte: today },
        }).sort({ rank: 1 });

        if (postRankProgress) {
          user.achievements[2].progress = calculateProgress(postRankProgress.rank);
        }

        await user.save();
      }
    }

    console.log("Achievements updated successfully.");
  } catch (err) {
    console.error(err);
  }
};

const updateTenStarPostAchievements = async (id) => {
  console.log("Running Update Ten Star Post Achievements", id);
  try {
    const user = await User.findOne({ slug: id }).exec();
    if(!user){
      //console.error('Kullanici bulunamadi', id);
      return;
    }
    /*if (user.slug) {
      const topStarredPost =await Post.find({ slug: user.slug, stars: { $lt: 10 } }).sort({ stars: -1 }).limit(1);

      user.achievements[0].progress = topStarredPost[0].stars;

      await user.save();
    }*/
    if (user.slug) {
      const topStarredPost = await Post.find({ slug: user.slug, stars: { $lt: 10 } }).sort({ stars: -1 }).limit(1);
    
      if (topStarredPost && topStarredPost.length > 0) {
        user.achievements[0].progress = topStarredPost[0].stars;
        await user.save();
      } else {
        console.error('No top starred post found for user with slug:', user.slug);
      }
    }

    console.log("Achievements updated successfully.");
  } catch (err) {
    console.error(err);
  }
};


const updateDisplayCase = asyncHandler(async (req, res) => {
  const { id, displayCase } = req.body

  // Confirm data 
  if (!id) {
    return res.status(400).json({ message: 'id required' })
  }

  // Does the user exist to update?
  const user = await User.findOne({ slug: id }).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  user.displayCase = displayCase

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);

});


const updatestartAchievement = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "id required" });
  }

  // Does the user exist to update?
  const user = await User.findOne({ slug: id }).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  user.achievements[0].complete += 1;

  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

module.exports = {
  getAllCrowns,
  getRankedPosts,
  updateLoginAchiev,
  updateLoginTracker,
  updateDisplayCase,
  updateWeeklyRankAchievements,
  updatestartAchievement,
  updateTenStarPostAchievements,
  getTrophyById
}
