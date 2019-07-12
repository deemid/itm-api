const BigNumber = require('bignumber.js')
const { User, UserWallet, PooledWallet } = require('@models')

module.exports = (req, res, next) => {
  User.findOne({ _id: req.user.id }, (err, user) => {
    UserWallet.find({ userId: user._id }, async (err, wallets) => {
      let walletsRes = wallets.map(wallet => {
        return wallet.walletAddress
      })
      let savedWallet
      for (let i = 0; i < walletsRes.length; i++) {
        let amount = parseFloat(req.body.amount) * 10 ** 18
        let finalAmount = new BigNumber(amount)

        let foundWallets = await PooledWallet.findWalletAddress({
          userId: user._id,
          walletAddress: walletsRes[i],
          amount: finalAmount.toString(),
        })
        if (foundWallets.length === 0) {
          savedWallet = await PooledWallet.store({
            userId: user._id,
            walletAddress: walletsRes[i],
            amount: req.body.amount,
            orderId: req.body.orderId,
            clientType: req.body.clientType,
          })
          break
        }
      }
      res.send(savedWallet).status(201)
    })
  })
}
