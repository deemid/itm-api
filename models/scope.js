const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types

const ScopeSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  path: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Scope', ScopeSchema)
