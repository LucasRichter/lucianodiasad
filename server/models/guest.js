const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const isValidCnpj = require('@brazilian-utils/is-valid-cnpj')

const eventsSchema = new Schema({
  event: { type: ObjectId, required: true, ref: 'Event' },
  email: { type: String, required: [true, 'Você precisa de um email.'] },
  name: { type: String, required: [true, 'Você precisa de um nome.'] },
  cnpj: { type: String, required: [true, 'CNPJ?'], validate: { validator: isValidCnpj, message: props => `${props.value} é um CNPJ inválido!` } },
  company_name: { type: String, required: true },
  phone: { type: String, required: true }
})

module.exports = restful.model('Guest', eventsSchema)
