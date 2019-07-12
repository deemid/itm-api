module.exports = {
  Users: {
    create: require('./users/create'),
  },
  Companies: {
    create: require('./companies/create'),
    alreadyExists: require('./companies/already-exists'),
    update: require('./companies/update'),
  },
  Roles: {
    create: require('./roles/create'),
    update: require('./roles/update'),
    updateScopes: require('./roles/updateScopes'),
  },
  Scopes: {
    create: require('./scopes/create'),
    update: require('./scopes/update'),
  },
}
