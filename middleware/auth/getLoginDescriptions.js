const { Content, Partner } = require('@models')

module.exports = async (req, res, next) => {
  try {
    // Contents
    let contents = await Content.find()
    let loginDescriptions = {}

    for (content of contents) {
      loginDescriptions[content.slug] = content.content
    }

    req.contents = loginDescriptions

    // Partners
    let partners = await Partner.find()
    req.partners = partners
    next()
  } catch (err) {
    next(err)
  }
}
