var { User } = require('@models')

module.exports = (req, res, next) => {
  User.register(req.body, (err, user) => {
    if (err) {
      res.status(422).send(err)
    } else {
      delete user.hashed_password
      res.status(201).send({ success: true, user })
    }
  })
}
