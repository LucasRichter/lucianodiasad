const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema

const configSchema = new Schema({
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  number_events: { type: Number, default: 4 },
  contact_email: { type: String },
  birthday_text: { type: String },
  primary_color: { type: String },
  secondary_color: { type: String },
  ternary_color: { type: String },
  instagram_token: { type: String },
  instagram_photos: { type: Number, default: 12 },
  college_text: { type: String },
  home_text: { type: String }
})

module.exports = restful.model('ConfigSchema', configSchema)
