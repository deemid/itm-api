const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PartnerSchema = new Schema({
  partnerName: {
    type: String,
    required: true,
  },
  companyNameFull: {
    type: String,
  },
  publicEmailAddress: {
    type: String,
  },
  logoSmall: {
    type: mongoose.SchemaTypes.Url,
  },
  logoLarge: {
    type: mongoose.SchemaTypes.Url,
  },
  description: {
    type: String,
  },
  plugins: {
    type: [{ type: String, enum: ['magento', 'shopify', 'woocommerce'] }],
  },
  categories: [
    {
      type: String,
      enum: [
        'retail',
        'cams',
        'content',
        'lingirie',
        'escorting',
        'dating',
        'b2b',
        'oracle',
        'swinging',
        'bdsm',
        'kink',
        'specialist',
      ],
    },
  ],
  targetAudience: [
    {
      type: String,
      enum: ['straight', 'gay', 'trans', 'lgbtiq'],
    },
  ],
  currencies: {
    type: [String],
  },
  localTimezone: {
    type: String,
  },
  localCurrency: {
    type: String,
  },
  primaryCountry: {
    type: String,
  },
  website: {
    type: mongoose.SchemaTypes.Url,
  },
})

PartnerSchema.methods.findUsers = function() {
  return mongoose.model('users').find({ partnerId: this._id })
}

PartnerSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    partnerName: this.partnerName,
    companyNameFull: this.companyNameFull,
    publicEmailAddress: this.publicEmailAddress,
    website: this.website,
    logoSmall: this.logoSmall,
    logoLarge: this.logoLarge,
    description: this.description,
    plugins: this.plugins,
    categories: this.categories,
    targetAudience: this.targetAudience,
    currencies: this.currencies,
    localTimezone: this.localTimezone,
    localCurrency: this.localCurrency,
    primaryCountry: this.primaryCountry,
    website: this.website,
  }
}

module.exports = mongoose.model('Partner', PartnerSchema)
