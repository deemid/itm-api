require('dotenv').config()
const web3 = require('./providers/web3-ws')
const web3Http = require('./providers/web3')
const TOKEN_ABI = require('./abi/token')
const PooledWallet = require('./models/pooled-wallet')
const ConfirmedTransfer = require('./models/confirmed-transfer')
var config = require('./config/database')
var mongoose = require('mongoose')


async function getConfirmations(txHash) {
  try {
    const web3 = web3Http

    const trx = await web3.eth.getTransaction(txHash)
    const currentBlock = await web3.eth.getBlockNumber()

    // When transaction is unconfirmed, its block number is null.
    // In this case we return 0 as number of confirmations
    return trx.blockNumber === null ? 0 : currentBlock - trx.blockNumber
  } catch (error) {
    console.log(error)
  }
}

function confirmEtherTransaction(event, confirmations = 1) {
  let txHash = event.transactionHash
  setTimeout(async () => {
    // Get current number of confirmations and compare it with sought-for value
    const trxConfirmations = await getConfirmations(txHash)

    console.log(
      'Transaction with hash ' +
        txHash +
        ' has ' +
        trxConfirmations +
        ' confirmation(s)'
    )

    if (trxConfirmations >= confirmations) {
      //Handle confirmation
      let confirmedTransfer = new ConfirmedTransfer(event)
      confirmedTransfer.save((err, savedConfirmedTransfer) => {
        if (!err) {
          console.log(
            'Transaction with hash ' +
              txHash +
              ' has been successfully confirmed'
          )
          console.log(savedConfirmedTransfer)
        } else {
          console.log(err)
        }
      })
      return
    }
    // Recursive call
    return confirmEtherTransaction(event, confirmations)
  }, 30 * 1000)
}

function watchTokenTransfers() {
  const tokenContract = new web3.eth.Contract(
    TOKEN_ABI,
    process.env.INTIMATE_TOKEN_ADDRESS,
    (error, result) => {
      if (error) console.log(error)
    }
  )

  // Generate filter options
  const options = {
    fromBlock: 'latest',
  }

  console.log('Environment', process.env)

  // Subscribe to Transfer events matching filter criteria
  tokenContract.events.Transfer(options, async (error, event) => {
    mongoose.connect(
      encodeURI(config.database),
      {
        useNewUrlParser: true,
      }
    )
    if (error) {
      console.log(error)
      return
    }
    event.eventId = event.id
    console.log('Received event', event)
    confirmEtherTransaction(event)
    return
  })
}

watchTokenTransfers()
