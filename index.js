const bip39 = require('bip39')
const hdkey = require('hdkey')
const ethUtil = require('ethereumjs-util')
const ethTx = require('ethereumjs-tx')
const Web3 = require('web3')

const mnemonic = bip39.generateMnemonic() //generates string
const seed = bip39.mnemonicToSeed(mnemonic) //creates seed buffer

console.log('Mnemonic generated: ', mnemonic)
console.log('Seed', seed.toString('hex'))

const root = hdkey.fromMasterSeed(seed)
const masterPrivateKey = root.privateKey.toString('hex')

console.log('Master private key: ', masterPrivateKey)
console.log('Root key', root.publicKey.toString('hex'))

const addrNode = root.derive("m/44'/60'/0'/0/1") //line 1
const pubKey = ethUtil.privateToPublic(addrNode._privateKey)
const addr = ethUtil.publicToAddress(pubKey).toString('hex')
const address = ethUtil.toChecksumAddress(addr)

console.log('addr', addr)
console.log('address', address)

const params = {
  nonce: 0,
  to: '0x4584158529818ef77D1142bEeb0b6648BD8eDb2f',
  value: '0.1',
  gasPrice: 5000000000,
  gasLimit: 21000,
  chainId: 3,
}

const tx = new ethTx(params)
//Signing the transaction with the correct private key
tx.sign(addrNode._privateKey)
const serializedTx = tx.serialize()

console.log(`0x${serializedTx.toString('hex')}`)

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
//Verify connection is successful
web3.eth.net
  .isListening()
  .then(() => console.log('is connected'))
  .catch(e => console.log('Wow. Something went wrong'))
