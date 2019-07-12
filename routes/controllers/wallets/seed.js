const bip39 = require('bip39')
const hdkey = require('hdkey')

module.exports = (req, res, next) => {
  const mnemonic = bip39.generateMnemonic() //generates string
  const seed = bip39.mnemonicToSeed(mnemonic) //creates seed buffer
  const root = hdkey.fromMasterSeed(seed)
  const masterPrivateKey = root.privateKey.toString('hex')
  res.json({ mnemonic, masterPrivateKey })
}
