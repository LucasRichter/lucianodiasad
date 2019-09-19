const sendEmail = require('../services/sendEmail')
const Config = require('../models/config')

module.exports = server => {
  server.post('/api/contact', async (req, res) => {
    const {email, phone, message, name, subject} = req.body
    const current = await Config.findOne()
    await sendEmail(current.contact_email, subject, `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Mensagem:</strong> ${message}</p>
    `)
    await sendEmail(email, 'Contato recebido!', `<p>Olá ${name}, recebemos seu contato e logo entraremos em contato!</p>`)
    return res.send({ staus: 'ok' })
  })
}
