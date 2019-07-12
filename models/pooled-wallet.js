const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PooledWalletSchema = new Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  clientType: {
    type: String,
    enum: ['magento', 'shopify', 'woocommerce'],
  },
})

PooledWalletSchema.static('findWalletAddress', function(fields, cb) {
  return new Promise((resolve, reject) => {
    let PooledWallet = mongoose.model('PooledWallet')
    PooledWallet.find(fields, (err, pooledWallets) => {
      if (err) {
        reject(err)
      } else {
        resolve(pooledWallets)
      }
    })
  })
})

PooledWalletSchema.static('store', function(fields, cb) {
  return new Promise((resolve, reject) => {
    let PooledWallet = mongoose.model('PooledWallet')
    let wallet = new PooledWallet(fields)
    wallet.save((err, savedWallet) => {
      if (!err) {
        resolve(savedWallet)
      } else {
        reject(err)
      }
    })
  })
})

module.exports = mongoose.model('PooledWallet', PooledWalletSchema)
