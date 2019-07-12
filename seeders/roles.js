require('dotenv').config()
require('../db')()

const Role = require('../models/role')

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

// Seed
Role.insertMany(roles).then(res => {
  console.log('Role seed success')
})
