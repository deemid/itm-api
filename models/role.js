const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  scopes: {
    type: [ObjectId],
    required: false,
    default: [],
  },
  managerRoleId: {
    type: ObjectId,
    required: false,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

module.exports = mongoose.model('Role', RoleSchema)
