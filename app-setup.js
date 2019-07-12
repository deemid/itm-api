const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const cors = require('cors')
const oauthserver = require('node-oauth2-server')
const models = require('./models')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const middleware = require('./middleware')
const flash = require('express-flash')

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./public/swagger.json');

module.exports = app => {
  app.set('env', process.env.NODE_ENV || 'development')
  app.set('port', process.env.PORT || 3000)
  app.set('view engine', 'ejs')
  app.use(cookieParser('ncie0fnft6wjfmgtjz8i'))
  app.use(
    cookieSession({
      name: 'session',
      keys: ['38348948926578463fdklfjksl'],

      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  )
  app.use(cors())
  app.use(flash())
  app.use(logger('dev'))
  app.use(function(err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') console.error('Error:', err)

    if (middleware.isValidationError(err)) {
      res.status(400)
      res.send(err.errors)
    } else {
      res.status(err.code || 500)
      res.send('Error')
    }
  })

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(methodOverride())

  app.oauth = oauthserver({
    model: models.oauth,
    grants: [
      'password',
      'authorization_code',
      'refresh_token',
      'client_credentials',
    ],
    debug: true,
  })

  app.use(passport.initialize())

  // app.use(logger('dev'))
  app.use(express.json())
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))
}
