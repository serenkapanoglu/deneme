const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  profileImage: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  postimage: {
      type: String
  },
  slug: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likesUsers: [{
    type: String
  }],
  shares: {
    type: Number,
    default: 0
  },
  shareUsers: [{
    type: String
  }],
  highestrank: {
    type: Number
  },
  point:{
    type: Number
  },
  currentrank: {
    type: Number
  },
  stars: {
    type: Number,
    default: 0
  },
  starDonator: [{
    type: String
  }],
  comments: {
    type: Number,
    default: 0
  },
  collaborator: [{
    slug: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    }
  }],
  tags: [{
    id: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: true
    }
  }],
  NSFW: {
    type: Boolean,
    default: false
  },
  Remix: {
    type: Boolean,
    default: false
  },
  Paywall: {
    type: Number
  },
  visibility: {
    type: String,
    default: "all"
  },
  share: {
    type: Boolean,
    default: false
  },
  PostTime: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    default: "World News"
  }
});

module.exports = mongoose.model('Post', postSchema);