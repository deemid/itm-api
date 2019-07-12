const { celebrate, Joi, errors } = require('celebrate')
module.exports = celebrate({
  body: Joi.object().keys({
    partnerName: Joi.string().required(),
    companyNameFull: Joi.string().optional(),
    logoSmall: Joi.string()
      .uri()
      .optional(),
    logoLarge: Joi.string()
      .uri()
      .optional(),
    description: Joi.string().optional(),
    plugins: Joi.array()
      .items(Joi.string().valid(...['magento', 'woocommerce', 'shopify']))
      .optional(),
    publicEmailAddress: Joi.string().email(),
    website: Joi.string().uri(),
    categories: Joi.array()
      .items(
        Joi.string().valid(
          ...[
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
          ]
        )
      )
      .optional(),
    targetAudience: Joi.array()
      .items(Joi.string().valid(...['straight', 'gay', 'trans', 'lgbtiq']))
      .optional(),
    currencies: Joi.array()
      .items(Joi.string())
      .allow(null),
    localTimezone: Joi.string().allow(null),
    localCurrency: Joi.string().allow(null),
    primaryCountry: Joi.string().allow(null),
  }),
})
