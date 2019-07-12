const web3 = require('./providers/web3-ws')
web3.eth
  .subscribe('pendingTransactions', function(error, result) {})
  .on('data', function(trxData) {
    web3.eth.getTransaction(trxData).then(console.log)
  })
