var app = require('./app')
var models = require('./models')

models.User.register(
  {
    email: 'reuben@intimate.io',
    password: 'test',
  },
  (err, savedUser) => {
    models.OAuthClientsModel.create(
      {
        clientId: 'partners',
        clientSecret: 'secret',
        redirectUri: '/oauth/redirect',
        userId: savedUser._id,
      },
      function() {
        process.exit()
      }
    )
  }
)
