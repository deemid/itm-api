const { User } = require('@models')
module.exports = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.status(400).send('Already existing')
    } else {
      next()
    }
  })
}
