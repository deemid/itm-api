const { PooledWallet, Transaction } = require('@models')
module.exports = (req, res, next) => {
  PooledWallet.findOne(
    { _id: mongoose.Types.ObjectId(req.body.id) },
    async (err, polledWallet) => {
      let transactionData = {
        transactionDate: new Date(),
        transactionHash: req.body.transactionHash,
        credit: polledWallet.amount,
        orderId: polledWallet.orderId,
        charge: 0,
        gateway: polledWallet.clientType,
        detail: 'TODO',
        userId: polledWallet.userId,
      }

      let transaction = new Transaction(transactionData)
      transaction.save((err, savedTransaction) => {
        if (err) {
          res.status(422).send('NOT OK')
        } else {
          savedTransaction._id = savedTransaction._id.toString()
          PooledWallet.deleteOne(
            { _id: mongoose.Types.ObjectId(req.body.id) },
            (err, deletedPolledWallet) => {
              res.send(savedTransaction).status(200)
            }
          )
        }
      })
    }
  )
}
