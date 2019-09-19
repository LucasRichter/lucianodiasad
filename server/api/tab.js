'use strict'

const helpers = require('../services/helpers')
const Tab = require('../models/tab')

Tab
  .methods(['get', 'post', 'put', 'delete'])
  .updateOptions({ new: true, runValidators: true })
  .before('post', [helpers.validateJwt])
  .before('put', [helpers.validateJwt])
  .before('delete', helpers.validateJwt)
  .after('post', helpers.formatResponse).after('put', helpers.formatResponse)

module.exports = function (server) {
  Tab.register(server, '/api/tabs')
}
