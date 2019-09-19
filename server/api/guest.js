'use strict'

const helpers = require('../services/helpers')
const Guest = require('../models/guest')
const sendEmail = require('../services/sendEmail')
const Event = require('../models/event')
const moment = require('moment')

const afterPost = async (req, res, next) => {
  const { email, event, name } = req.body
  const current = await Event.findOne({
    _id: event
  })

  await sendEmail(email, 'Confimação!', `
    <p>Olá ${name} confirmamos sua presença no evento "${current.title}" no dia ${moment(current.date).format('DD/MM/YYYY')}.</p>
  `)

  next()
}

const beforePost = async (req, res, next) => {
  const { event } = req.body

  const current = await Event.findOne({
    _id: event
  })
  const guests = await Guest.count({ event })

  if (guests >= current.limit) {
    return res.status(400).send({ message: 'Número de vagas já preenchida! Por favor, entre em contato para maiores informações.' })
  }

  next()
}

Guest
  .methods(['get', 'post', 'put', 'delete'])
  .updateOptions({ new: true, runValidators: true })
  .before('put', helpers.validateJwt)
  .before('post', beforePost)
  .after('post', [afterPost, helpers.formatResponse])
  .after('put', helpers.formatResponse)
  .before('delete', helpers.validateJwt)

module.exports = function (server) {
  Guest.register(server, '/api/guests')
}
