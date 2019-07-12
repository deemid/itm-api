require('dotenv').config()
require('module-alias/register')
const createError = require('http-errors')
const express = require('express')
const Celebrate = require('celebrate')
const app = express()

// Connect to MongoDB
require('./db')()

// Set app variables and middlewares
require('./app-setup')(app)

// Routes
const routes = require('./routes')

app.use('/wallet', routes.wallet)
app.use('/users', routes.users)
app.use('/transactions', routes.transactions)
app.use('/clients', routes.clients)
app.use('/oauth', routes.oauth(app))
app.use('/session', routes.session)
app.use('/companies', routes.companies)
app.use('/roles', routes.roles)
app.use('/scopes', routes.scopes)

app.get('/', (req, res) => {
  res.send('contact accounts@intimate.io')
})

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// Error handler
app.use(Celebrate.errors())
app.use(require('./middleware/errorHandler'))

//app.use(Celebrate.errors())
app.use(app.oauth.errorHandler())

module.exports = app
