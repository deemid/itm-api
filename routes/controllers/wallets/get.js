const { User, UserWallet } = require('@models')

module.exports = (req, res, next) => {
  User.findOne({ email: req.user.id }, (err, user) => {
    UserWallet.find({ userId: user._id }, (err, wallets) => {
      let walletsRes = wallets.map(wallet => {
        return wallet.walletAddress
      })
      res.send(walletsRes).status(200)
    })
  })
}
