'use strict'

const helpers = require('../services/helpers')
const Config = require('../models/config')

const postBefore = async (req, res, next) => {
  const count = await Config.count()
  if (count >= 1) {
    return res.status(400).send({ message: 'Already exist configuration!' })
  }

  next()
}

Config
  .methods(['put', 'post'])
  .updateOptions({ new: true, runValidators: true })
  .route('current.get', (req, res, next) => {
    Config.findOne().then(result => res.json(result))
  })
  .before('post', postBefore)
  .before('put', helpers.validateJwt)
  .after('put', helpers.formatResponse)

module.exports = function (server) {
  Config.register(server, '/api/config')
}
