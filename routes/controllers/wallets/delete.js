const { User, UserWallet } = require('@models')
module.exports = (req, res, next) => {
  const publicKey = req.body.key
  User.findOne({ email: req.user.id }, (err, user) => {
    UserWallet.deleteOne({ walletAddress: publicKey }, (err, deletedWallet) => {
      res.send('OK').status(200)
    })
  })
}
