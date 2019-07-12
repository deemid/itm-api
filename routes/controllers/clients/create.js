var models = require('@models')
const hat = require('hat')
const rack = hat.rack()

module.exports = (req, res, next) => {
  models.User.findOne({ email: req.user.id }, (err, user) => {
    let oauthClient = {
      clientId: hat(),
      clientSecret: rack(),
      userId: user._id,
    }
    models.OAuthClientsModel.create(oauthClient, function(err, savedClient) {
      if (!err) {
        res.json(savedClient).status(201)
      }
    })
  })
}
