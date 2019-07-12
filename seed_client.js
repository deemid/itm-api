var app = require('./app')
var models = require('./models')

models.User.register(
  {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  (err, user) => {
    // IMPLICIT GRANT - PARTNERS PORTAL
    models.OAuthClientsModel.create(
      {
        clientId: process.env.PARTNER_CLIENT_ID,
        clientSecret: process.env.PARTNER_CLIENT_SECRET,
        redirectUri: process.env.PARTNER_CLIENT_REDIRECT_URI,
        userId: user._id,
      },
      function() {
        process.exit()
      }
    )

    require('./seeders/roles')
  }
)
