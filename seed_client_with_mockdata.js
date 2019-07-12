var app = require('./app')
var models = require('./models')
const {seedPartnerUsers} = require('./factories/utils/seed_fakes')


models.User.register(
  {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  (err, user) => {
    console.log(err)
    // IMPLICIT GRANT - PARTNERS PORTAL
    models.OAuthClientsModel.create(
      {
        clientId: process.env.PARTNER_CLIENT_ID,
        clientSecret: process.env.PARTNER_CLIENT_SECRET,
        redirectUri: process.env.PARTNER_CLIENT_REDIRECT_URI,
        userId: user._id,
      },
      async function() {
        await Promise.all(seedPartnerUsers(100))
        process.exit()
      }
    )

    require('./seeders/roles')
  }
)
