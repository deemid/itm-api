require('dotenv').config()
require('../db')()

const Scope = require('../models/scope')

let scopes = [
  {
    slug: 'companies.create',
    path: '/companies',
    method: 'POST'
  },
  {
    slug: 'companies.getAll',
    path: '/companies',
    method: 'GET'
  },
]

// Seed
Scope.insertMany(scopes).then(res => {
  console.log('Scope seed success')
})
