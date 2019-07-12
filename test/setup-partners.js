const faker = require('faker')
const { User, OAuthClientsModel, Role } = require('../models')

module.exports = cb => {
  const roles = [
    {
      name: 'Super Admin',
      scopes: [],
      managerRoleId: null,
      slug: 'SUPER_ADMIN',
      description: '',
    },
    {
      name: 'Admin',
      scopes: [],
      managerRoleId: null,
      slug: 'ADMIN',
      description: '',
    },
    {
      name: 'Partner',
      scopes: [],
      managerRoleId: null,
      slug: 'PARTNER_ROOT',
      description: '',
    },
    {
      name: 'Partner Manager',
      scopes: [],
      managerRoleId: null,
      slug: 'PARTNER_MANAGER',
      description: '',
    },
    {
      name: 'Partner Finance',
      scopes: [],
      managerRoleId: null,
      slug: 'PARTNER_FINANCE',
      description: '',
    },
    {
      name: 'Partner Marketer',
      scopes: [],
      managerRoleId: null,
      slug: 'PARTNER_MARKETER',
      description: '',
    },
  ]

  Role.insertMany(roles).then(res => {
    Role.findOne({ slug: 'SUPER_ADMIN' }).then(role => {
      User.register(
        {
          email: faker.internet.email(),
          password: 'testpassword',
          roleId: role._id,
        },
        (err, registeredUser) => {
          OAuthClientsModel.create(
            {
              clientId: 'partners',
              clientSecret: 'secret',
              redirectUri: '/callback',
              userId: registeredUser._id,
            },
            cb
          )
        }
      )
    })
  })
}
