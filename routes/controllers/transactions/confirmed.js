const BigNumber = require('bignumber.js')
const mongoose = require('mongoose')
const { User, PooledWallet, ConfirmedTransfer } = require('@models')

module.exports = (req, res, next) => {
  User.findOne({ _id: req.user.id }, (err, user) => {
    PooledWallet.find({ userId: user._id }, (err, pooledWallets) => {
      let wallets = pooledWallets.map(wallet => {
        return wallet.walletAddress
      })
      ConfirmedTransfer.find(
        {
          'returnValues._tokenrecipient': { $in: wallets },
          found: { $ne: true },
        },
        (err, confirmedTransfers) => {
          let filteredPooledWallets = []
          for (let i = 0; i < confirmedTransfers.length; i++) {
            for (let j = 0; j < pooledWallets.length; j++) {
              let confirmedTransfer = confirmedTransfers[i]
              let pooledWallet = pooledWallets[j]
              let transferValue = new BigNumber(
                confirmedTransfer.returnValues._value
              )
              let storedValue = new BigNumber(pooledWallet.amount)
              transferValue = transferValue.div(10 ** 18)
              if (transferValue.toNumber() === storedValue.toNumber()) {
                pooledWallet.transactionHash = confirmedTransfer.transactionHash
                confirmedTransfer.found = true
                confirmedTransfer.save((err, savedConfirmedTransfer) => {
                  console.log(savedConfirmedTransfer)
                })
                filteredPooledWallets.push({ pooledWallet, confirmedTransfer })
                break
              }
            }
          }

          let filteredConfirmedTransfers = filteredPooledWallets.map(wallet => {
            return mongoose.Types.ObjectId(wallet.confirmedTransfer._id)
          })
          ConfirmedTransfer.updateMany(
            { _id: { $in: filteredConfirmedTransfers } },
            { $set: { found: true } },
            (err, confirmedTransfers) => {
              res.send(filteredPooledWallets).status(200)
            }
          )
        }
      )
    })
  })
}
