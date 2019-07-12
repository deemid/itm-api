const mongoose = require('mongoose')
const config = require('./config/database')

module.exports = () => {
  mongoose.set('useCreateIndex', true)
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(
      process.env.LOCAL_MONGO_DB + '/intimate' + Math.ceil(Math.random() * 100),
      {
        useNewUrlParser: true,
      }
    )
  } else {
    mongoose.connect(
      encodeURI(config.database),
      {
        useNewUrlParser: true,
      }
    )
  }
}
