const mongoose = require('mongoose')

const achievementsSchema = new mongoose.Schema({
  crown: {
    type: String,
  
  },
  goal: {
    type: String,
  },
  image: {
    type: String
  
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true
  },
  progressText: {
    type: String,
    required: true
  },

})


module.exports = mongoose.model('Achievements', achievementsSchema)