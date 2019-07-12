const { web3 } = require('@providers')
const { User, UserWallet } = require('@models')
module.exports = async (req, res, next) => {
  const publicKey = req.body.key
  if (!web3.utils.isAddress(publicKey)) {
    res.json({ success: false, errors: ['Invalid address'] }).status(422)
    return
  }

  User.findOne({ email: req.user.id }, (err, user) => {
    UserWallet.find(
      { userId: user._id, walletAddress: publicKey },
      (err, foundWallets) => {
        if (foundWallets.length > 0) {
          res.json({ success: false, errors: ['Already added'] }).status(422)
          return
        }
        let wallet = new UserWallet({
          walletAddress: publicKey,
          userId: user._id,
        })

        wallet.save(err => {
          if (err) {
            res.send('Not OK').status(422)
          } else {
            res.send('OK').status(201)
          }
        })
      }
    )
  })
}
