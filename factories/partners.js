require('module-alias/register')
const bcrypt = require('bcrypt')
const Factory = require('factory-lady')
const hat = require('hat')
const rack = hat.rack()
const { Partner } = require('@models')
const faker = require('faker')

module.exports = Factory.define('partners', Partner, {
  partnerName: (cb) => cb(faker.company.companyName()),
  companyNameFull: (cb) => cb(faker.company.companyName()),
  logoSmall: (cb) => cb(faker.internet.url()),
  logoLarge: (cb) => cb(faker.internet.url()),
  description: (cb) => cb(faker.random.words()),
  plugins: (cb) => cb(new Array(5).fill(undefined).map(() => {
    return faker.random.arrayElement(['magento', 'shopify', 'woocommerce'])
  })),
  categories: (cb) => cb(new Array(5).fill(undefined).map(() => {
    return faker.random.arrayElement([
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
    ])
  })),
  targetAudience: (cb) => cb(new Array(5).fill(undefined).map(() => {
    return faker.random.arrayElement(['straight', 'gay', 'trans', 'lgbtiq'])
  })),
  currencies: (cb) => cb(new Array(5).fill(undefined).map(() => {
    return faker.finance.currencyCode()
  })),
  website: (cb) => cb(faker.internet.url()),
  publicEmailAddress: (cb) => cb(faker.internet.email()),
  localTimezone: ['Asia/Manila'],
  localCurrency: 'USD',
  primaryCountry: 'PH',
})
