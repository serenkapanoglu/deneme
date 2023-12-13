const PostRank = require("../../models/postranks");
const Post = require("../../models/posts");

const getYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return yesterday;
};

const updateRankedPost = async (post, timeScale, idx) => {
  try {
    let rankedPost = await PostRank.findOne({
      post: post._id,
      time_scale: timeScale,
    });
    if (!rankedPost) {
      rankedPost = new PostRank({
        post: post._id,
        tags: post.tags,
        time_scale: timeScale,
        point: post.point,
        slug: post.slug,
        PostTime: post.PostTime,
        rank: idx + 1,
      });
    } else {
      rankedPost.tags = post.tags;
      rankedPost.point = post.point;
      rankedPost.PostTime = post.PostTime;
      rankedPost.rank = idx + 1
    }
    await rankedPost.save();
    console.log(
      `Run:  ${timeScale} rank post update| Post's ID updated:`,
      post._id
    );
  } catch (error) {
    console.error("Error creating/updating rankedpost:", error);
  }
};

const initRanking = async (timeScale) => {
  try {
    const yesterday = getYesterday();
    let filter = {};

    if (timeScale === "daily") {
      filter = {
        PostTime: {
          $gte: new Date(
            yesterday.getFullYear(),
            yesterday.getMonth(),
            yesterday.getDate(),
            0,
            0,
            0
          ),
          $lt: new Date(
            yesterday.getFullYear(),
            yesterday.getMonth(),
            yesterday.getDate() + 1,
            0,
            0,
            0
          ),
        },
      };
    } else if (timeScale === "weekly") {
      const startOfWeek = new Date(yesterday);
      startOfWeek.setDate(yesterday.getDate() - yesterday.getDay() + 1);
      const endOfWeek = new Date(yesterday);
      endOfWeek.setDate(yesterday.getDate() - yesterday.getDay() + 8);
      filter = {
        PostTime: {
          $gte: startOfWeek,
          $lt: endOfWeek,
        },
      };
    } else if (timeScale === "monthly") {
      filter = {
        PostTime: {
          $gte: new Date(
            yesterday.getFullYear(),
            yesterday.getMonth(),
            1,
            0,
            0,
            0
          ),
          $lt: new Date(
            yesterday.getFullYear(),
            yesterday.getMonth() + 1,
            1,
            0,
            0,
            0
          ),
        },
      };
    } else if (timeScale === "yearly") {
      filter = {
        PostTime: {
          $gte: new Date(yesterday.getFullYear(), 0, 1, 0, 0, 0),
          $lt: new Date(yesterday.getFullYear() + 1, 0, 1, 0, 0, 0),
        },
      };
    }
    const posts = await Post.find(filter);
    posts.sort((a, b) => b.point - a.point);
    if (posts && posts.length > 0) {
      posts.forEach((post, idx) => {
        updateRankedPost(post, timeScale, idx);
      });
    } else {
      console.log(`Not found any posts in time scale: ${timeScale}`);
    }
  } catch (error) {
    console.error("Error init daily rank:", error);
  }
};

module.exports = {
    initRanking
}
