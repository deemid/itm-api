const mongoose = require('mongoose')
const Schema = mongoose.Schema
const authorizedClientIds = ['partners']

const OAuthClientsSchema = new Schema({
  clientId: String,
  clientSecret: String,
  redirectUri: String,
  userId: String,
})

OAuthClientsSchema.static('getClient', function(
  clientId,
  clientSecret,
  callback
) {
  const params = { clientId: clientId }
  if (clientSecret != null) {
    params.clientSecret = clientSecret
  }
  OAuthClientsModel.findOne(params, callback)
})

OAuthClientsSchema.static('grantTypeAllowed', function(
  clientId,
  grantType,
  callback
) {
  if (grantType === 'password' || grantType === 'authorization_code') {
    return callback(false, authorizedClientIds.indexOf(clientId) >= 0)
  }

  callback(false, true)
})

mongoose.model('oauth_clients', OAuthClientsSchema)
const OAuthClientsModel = mongoose.model('oauth_clients')
module.exports = OAuthClientsModel
