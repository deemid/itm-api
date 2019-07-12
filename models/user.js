const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const bip39 = require('bip39')
require('mongoose-type-url')
const Schema = mongoose.Schema
const { encrypt } = require('../utils/crypto')
const hat = require('hat')
const rack = hat.rack()
const OAuthClientsModel = require('./oauth_client')

const OAuthUsersSchema = new Schema({
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  password_reset_token: { type: String },
  reset_token_expires: Date,
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  lastUpdate: {
    type: Date,
  },
  mnemonic: {
    type: String,
  },
  roleId: {
    type: String,
  },
  partnerId: {
    type: String,
  },
  activationCode: {
    type: String
  }
})

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}
OAuthUsersSchema.methods.toJSON = function() {
  return {
    email: this.email,
    name: this.name,
  }
}

OAuthUsersSchema.static('register', function(fields, cb) {
  var user

  fields.hashed_password = hashPassword(fields.password)
  delete fields.password

  const mnemonic = bip39.generateMnemonic() //generates string
  fields.mnemonic = encrypt(mnemonic)

  user = new OAuthUsersModel(fields)
  let oauthClient = {
    clientId: hat(),
    clientSecret: rack(),
    userId: user._id,
  }

  OAuthClientsModel.create(oauthClient, function(err, savedClient) {
    user.save(cb)
  })
  
})

OAuthUsersSchema.static('getUser', function(email, password, cb) {
  OAuthUsersModel.authenticate(email, password, function(err, user) {
    if (err || !user) return cb(err)
    cb(null, user.email)
  })
})
OAuthUsersSchema.static('getUserFromClient', function(
  clientId,
  clientSecret,
  callback
) {
  var OAuthClient = mongoose.model('oauth_clients')
  OAuthClient.findOne({ clientId, clientSecret }).exec((err, client) => {
    if (!err) {
      OAuthUsersModel.findOne(
        { _id: mongoose.Types.ObjectId(client.userId) },
        (err, user) => {
          let userJSON = {
            _id: user._id.toString(),
            email: user.email,
          }
          callback(null, userJSON)
        }
      )
    }
  })
})
OAuthUsersSchema.static('authenticate', function(email, password, cb) {
  this.findOne({ email: email }, function(err, user) {
    if (err || !user) return cb(err)
    cb(null, bcrypt.compareSync(password, user.hashed_password) ? user : null)
  })
})

mongoose.model('users', OAuthUsersSchema)

const OAuthUsersModel = mongoose.model('users')
module.exports = OAuthUsersModel
