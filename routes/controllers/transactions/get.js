const { User, Transaction } = require('@models')
module.exports = (req, res, next) => {
  User.findOne({ email: req.user.id }, (err, user) => {
    Transaction.find({ userId: user._id }, async (err, transactions) => {
      res.send(transactions).status(200)
    })
  })
}
