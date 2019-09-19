const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema

const eventsSchema = new Schema({
  permalink: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true }
})

module.exports = restful.model('Tab', eventsSchema)
