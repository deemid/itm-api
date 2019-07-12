const { User, PooledWallet } = require('@models')

module.exports = (req, res, next) => {
  User.findOne({ email: req.user.id }, (err, user) => {
    PooledWallet.find({ userId: user._id }, (err, pooledWallets) => {
      res.send(pooledWallets).status(200)
    })
  })
}
