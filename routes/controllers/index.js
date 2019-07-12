module.exports = {
  OAuth: {
    requestAPIAccess: require('./oauth/requestAPIAccess'),
    implicit: require('./oauth/implicit'),
    getAuthorise: require('./oauth/getAuthorise'),
  },
  Users: {
    create: require('./users/create'),
  },
  Clients: {
    create: require('./clients/create'),
  },
  Session: {
    get: require('./session/get'),
  },
  Transactions: {
    getQueue: require('./transactions/get-queue'),
    postQueue: require('./transactions/post-queue'),
    get: require('./transactions/get'),
    confirmed: require('./transactions/confirmed'),
    complete: require('./transactions/complete'),
  },
  Wallets: {
    seed: require('./wallets/seed'),
    addressesGetIndex: require('./wallets/addresses-get-index'),
    addressesList: require('./wallets/addresses-list'),
    get: require('./wallets/get'),
    qrcode: require('./wallets/qrcode'),
    store: require('./wallets/store'),
    delete: require('./wallets/delete'),
  },
  Companies: {
    create: require('./companies/create'),
    get: require('./companies/get'),
    paramId: require('./companies/paramId'),
    update: require('./companies/update'),
    getById: require('./companies/getById')
  },
  Roles: {
    create: require('./roles/create'),
    get: require('./roles/get'),
    getById: require('./roles/getById'),
    update: require('./roles/update'),
    paramId: require('./roles/paramId'),
    delete: require('./roles/delete'),
    addScope: require('./roles/addScope'),
    removeScope: require('./roles/removeScope'),
  },
  Scopes: {
    create: require('./scopes/create'),
    get: require('./scopes/get'),
    getById: require('./scopes/getById'),
    update: require('./scopes/update'),
    paramId: require('./scopes/paramId'),
    delete: require('./scopes/delete'),
  },
}
