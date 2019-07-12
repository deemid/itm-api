const Web3 = require('web3')

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    process.env.INFURA_URL_HTTP + '/' + process.env.INFURA_TOKEN
  )
)

module.exports = web3
