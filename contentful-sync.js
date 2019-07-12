require('dotenv').config()
const mongoose = require('mongoose')
var config = require('./config/database')
const { getLoginPageDescriptions, getPartners } = require('./utils/contentful')
const Content = require('./models/content')
const Partner = require('./models/partner')
const fs = require('fs')
mongoose.connect(
  encodeURI(process.env.MONGODB_URI),
  {
    useNewUrlParser: true,
  }
)

// Login Page Descriptions
getLoginPageDescriptions()
  .then(res => {
    const slugs = [
      'loginDescription',
      'requestApiFormDescription',
      'partnersDescription',
    ]
    let { fields } = res.items[0]

    let data = slugs.map(slug => {
      return {
        slug,
        content: fields[slug],
      }
    })

    Content.deleteMany({}, err => {
      if (!err) {
        Content.insertMany(data, (err, contents) => {
          if (!err) {
            console.log('Content bulk create success')
          }
        })
      }
    })
  })
  .catch(err => {
    console.log(err)
  })

// Partners
getPartners().then(res => {
  let partners = []

  const findAsset = id => {
    return res.includes.Asset.find(asset => {
      return asset.sys.id === id
    })
  }

  for (let partner of res.items) {
    let { partnerName, destinationUrl, companyOverview, logo } = partner.fields
    let asset = findAsset(logo.sys.id)

    partners.push({
      partnerName,
      destinationUrl,
      companyOverview,
      logo: asset.fields.file.url,
    })
  }

  Partner.deleteMany({}, err => {
    if (!err) {
      Partner.insertMany(partners, err => {
        if (!err) {
          console.log('Partners bulk create success')
        }
      })
    }
  })
})
