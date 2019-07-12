const { User } = require('@models')

module.exports = (req, res, next) => {
  User.findOne({ email: req.session.userId }, function(err, user) {
    if (err) return next(err)
    res.locals.user = user
    next()
  })
}
