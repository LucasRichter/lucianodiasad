'use strict'

const _ = require('lodash')
const jwt = require('jsonwebtoken')

const parseErrors = (nodeRestfulErrors) => {
  const errors = {}
  _.forIn(nodeRestfulErrors, ({ path, message }) => {
    errors[path] = message
  })
  return errors
}

module.exports.formatResponse = function (req, res, next) {
  const bundle = res.locals.bundle

  if (bundle.errors) {
    const errors = parseErrors(bundle.errors)
    res.status(400).json({ errors })
  } else {
    next()
  }
}

module.exports.validateJwt = function (req, res, next) {
  var token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(401).send({ auth: false, message: 'Token inválido ou exiparado. Deslogue e logue novamente!' })

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id
    next()
  })
}
