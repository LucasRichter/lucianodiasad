const sendEmail = require('../services/sendEmail')
const Config = require('../models/config')

module.exports = server => {
  server.post('/api/contact', async (req, res) => {
    const current = await Config.findOne()
    await sendEmail(current.contact_email, req.body.subject, `
      <p><strong>Nome:</strong> ${req.body.name}</p>
      <p><strong>E-mail:</strong> ${req.body.email}</p>
      <p><strong>Telefone:</strong> ${req.body.phone}</p>
      <p><strong>Mensagem:</strong> ${req.body.message}</p>
    `)
    res.staus(200).send({ staus: 'ok' })
  })
}
