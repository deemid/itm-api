const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
  transactionDate: {
    type: Date,
  },
  detail: {
    type: Object,
  },
  credit: {
    type: Number,
    required: true,
  },
  charge: {
    type: Number,
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  gateway: {
    type: String,
    enum: ['magento', 'shopify', 'woocommerce'],
  },
  orderId: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Transaction', TransactionSchema)
