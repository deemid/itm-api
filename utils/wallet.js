const bip39 = require('bip39')
const hdkey = require('hdkey')
const ethUtil = require('ethereumjs-util')
const ethTx = require('ethereumjs-tx')
const Web3 = require('web3')

function getAddress(mnemonic, index) {
  const seed = bip39.mnemonicToSeed(mnemonic)
  const root = hdkey.fromMasterSeed(seed)
  const addrNode = root.derive("m/44'/60'/0'/0/" + index) //line 1
  const pubKey = ethUtil.privateToPublic(addrNode._privateKey)
  const addr = ethUtil.publicToAddress(pubKey).toString('hex')
  const publicAddress = ethUtil.toChecksumAddress(addr)
  const privateAddress = addrNode.privateKey.toString('hex')
  return { publicAddress, privateAddress }
}

function balanceOf(walletAddress) {
  return new Promise((resolve, reject) => {
    let tokenAddress = process.env.INTIMATE_TOKEN_ADDRESS

    // The minimum ABI to get ERC20 Token balance
    let minABI = [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
      },
      // decimals
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
      },
    ]

    // Get ERC20 Token contract instance
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://mainnet.infura.io/' + process.env.INFURA_TOKEN
      )
    )
    let contract = new web3.eth.Contract(minABI, tokenAddress)

    console.log(walletAddress)
    // Call balanceOf function
    contract.methods.balanceOf(walletAddress).call((error, balance) => {
      // Get decimals
      contract.methods.decimals().call((error, decimals) => {
        // calculate a balance
        balance = balance / 10 ** decimals
        resolve(balance)
      })
    })
  })
}

module.exports.getAddress = getAddress
module.exports.balanceOf = balanceOf
