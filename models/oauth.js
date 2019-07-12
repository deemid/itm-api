const AuthCode = require('./oauth_authcode')
const AccessToken = require('./oauth_accesstoken')
const RefreshToken = require('./oauth_refreshtoken')
const User = require('./user')
const Client = require('./oauth_client')

// node-oauth2-server API
module.exports = {
  getAuthCode: AuthCode.getAuthCode,
  saveAuthCode: AuthCode.saveAuthCode,
  getAccessToken: AccessToken.getAccessToken,
  saveAccessToken: AccessToken.saveAccessToken,
  saveRefreshToken: RefreshToken.saveRefreshToken,
  getRefreshToken: RefreshToken.getRefreshToken,
  getUser: User.getUser,
  getClient: Client.getClient,
  grantTypeAllowed: Client.grantTypeAllowed,
  getUserFromClient: User.getUserFromClient,
}
