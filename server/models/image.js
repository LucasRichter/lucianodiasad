const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema
const mongooseThumbnailLib = require('mongoose-thumbnail')
const mongooseThumbnailPlugin = mongooseThumbnailLib.thumbnailPlugin

const eventsSchema = new Schema({
  carousel: { type: Boolean, default: false },
  home: { type: Boolean, default: false },
  college: { type: Boolean, default: false },
  birthday: { type: Boolean, default: false }
})

eventsSchema.plugin(mongooseThumbnailPlugin, {
  name: 'file'
})

module.exports = restful.model('Image', eventsSchema)
