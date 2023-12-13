const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        default: "EXPLORER"
    },
    displayTut: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: "MODEL"
    },
    slug: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    postTut: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: "Who are you, brave traveler?"
    },
    bioTut: {
        type: Boolean,
        default: false
    },
    profileImage: {
        data: Buffer,
        contentType: String
    },
    qrcode: {
        type: String,
        default: ''
    },
    profImageTut: {
        type: Boolean,
        default: false
    },
    backImage: {
        data: Buffer,
        contentType: String
    },
    backImageTut: {
        type: Boolean,
        default: false
    },
    tutcomplete: {
        type: Boolean,
        default: false
    },
    tutview: {
        type: Boolean,
        default: true
    },
    stars: {
        type: Number,
        default: 0
    },
    achievements: [{
        id: {
            type: String,
            required: true
        },
        crown: {
            type: String,
            required: true
            },
        goal: {
            type: String,
            required: true
        },
        complete: {
            type: Number,
            default: 0,
            required: true
        },
        progress: {
            type: Number,
            default: 0,
            required: true
        }
    }],
    displayCase: [{
        type: String
    }],
    following : [
        {
            type: String,
            ref: 'User'
        }
    ],
    supporting : [
        {
            type: String,
            ref: 'User'
        }
    ],
    followers : [
        {
            type: String,
            ref: 'User'
        }
    ],
    supporters : [
        {
            type: String,
            ref: 'User'
        }
    ],
    tagFollowing: [{
        tagId: {
            type: String,
            required: true
          },
        tag: {
            type: String,
            required: true
          }
    }],
    lastlogin: {
        type: Date,
        default: Date.now
      },
    consecutivelogins: {
        type: Number,
        default: 0
    },
    profimage: {
        type: String
      },
    backimage: {
        type: String
      },
    active: {
        type: Boolean,
        default: true
    },
    NSFW: {
        type: Boolean,
        default: true
      }
})

// Define the comparePassword method
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      // Use bcrypt to compare the provided password (plaintext) with the hashed password (stored in the database)
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw error;
    }
  };

module.exports = mongoose.model('User', userSchema)