const events = require('events')
const {COMPANIES_CREATE} = require('./constants')
const eventEmitter = new events.EventEmitter()

eventEmitter.on(COMPANIES_CREATE, require('./mail-welcome'))

module.exports = eventEmitter