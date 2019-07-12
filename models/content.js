const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContentSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Content', ContentSchema)
