const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserWalletAddressSchema = new Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('UserWalletAddress', UserWalletAddressSchema)
