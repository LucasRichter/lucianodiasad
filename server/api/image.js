'use strict'

const helpers = require('../services/helpers')
const Image = require('../models/image')

const setFile = async (req, res, next) => {
  if (req.files && req.files[0]) {
    req.body.file = req.files[0]
  }

  if (req.body.college) {
    await Image.updateMany({ college: true }, { college: false })
  }

  if (req.body.birthday) {
    await Image.updateMany({ birthday: true }, { birthday: false })
  }

  if (req.body.home) {
    await Image.updateMany({ home: true }, { home: false })
  }

  next()
}

Image.methods(['get', 'post', 'put', 'delete'])
  .updateOptions({ new: true, runValidators: true })
  .before('post', [helpers.validateJwt, setFile])
  .before('put', [helpers.validateJwt, setFile]).before('delete', helpers.validateJwt)
  .after('post', helpers.formatResponse).after('put', helpers.formatResponse)

module.exports = function (server) {
  Image.register(server, '/api/images')
}
