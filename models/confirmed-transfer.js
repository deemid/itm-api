const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConfirmedTransferSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  blockNumber: {
    type: Number,
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  transactionIndex: {
    type: Number,
    required: true,
  },
  blockHash: {
    type: String,
    required: true,
  },
  logIndex: {
    type: Number,
    required: true,
  },
  removed: {
    type: Boolean,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  returnValues: {
    type: {},
  },
  event: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  raw: {
    type: {},
    required: true,
  },
  found: {
    type: Boolean,
  },
})

module.exports = mongoose.model('ConfirmedTransfer', ConfirmedTransferSchema)
