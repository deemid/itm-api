const router = require('express').Router()
const { OAuth } = require('./controllers')
const validators = require('../middleware/validators')

module.exports = app => {
  router.all('/token', app.oauth.grant())
  router.post('/implicit', OAuth.implicit)
  router
    .route('/authorise')
    .get(OAuth.getAuthorise)
    .post(
      (req, res, next) => {
        if (!req.session.userId) {
          return res.redirect(
            '/session?redirect=' +
              req.path +
              '&client_id=' +
              req.query.client_id
          )
        }

        next()
      },
      app.oauth.authCodeGrant(function(req, next) {
        // The first param should to indicate an error
        // The second param should a bool to indicate if the user did authorise the app
        // The third param should for the user/uid (only used for passing to saveAuthCode)
        next(null, req.body.allow === 'yes', req.session.userId, null)
      })
    )

  router.post(
    '/requestAccess',
    validators.requestApiValidators,
    OAuth.requestAPIAccess
  )

  return router
}
