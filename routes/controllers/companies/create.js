const { User, Partner, UserWallet } = require('@models')
const generator = require('generate-password')
const { getAddress } = require('@utils/wallet')
const { decrypt } = require('@utils/crypto')
const { CompaniesEvents } = require('@events/index')
const { COMPANIES_CREATE } = require('@events/companies/constants')


module.exports = async (req, res, next) => {
  let userData = {
    ...req.body,
  }

  let password = generator.generate({
    length: 10,
    numbers: true,
  })

  userData.password = password

  delete userData.companyName

  let foundPartner = await Partner.findOne({
    partnerName: req.body.companyName,
  })
  let addedPartner = false
  if (!foundPartner) {
    foundPartner = new Partner({
      partnerName: req.body.companyName,
    })
    foundPartner = await foundPartner.save()
    addedPartner = true
  }

  userData.partnerId = foundPartner._id

  User.register(userData, async (err, user) => {
    if (err) {
      res.status(422).send(err)
    } else {
      let wallets = []
      for (let i = 0; i < 10; i++) {
        let walletAddress = getAddress(decrypt(user.mnemonic), i)
        let data = {
          walletAddress: walletAddress.publicAddress,
          userId: user._id,
        }
        wallets.push(data)
      }

      UserWallet.insertMany(wallets, walletsStored => {
        CompaniesEvents.emit(COMPANIES_CREATE, {company: foundPartner, user, password})
        
        res.status(201).send({ success: true, foundPartner, addedPartner })
      })
    }
  })
}
