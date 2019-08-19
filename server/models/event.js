const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema
const mongooseThumbnailLib = require('mongoose-thumbnail')
const mongooseThumbnailPlugin = mongooseThumbnailLib.thumbnailPlugin

const eventsSchema = new Schema({
  permalink: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  limit: { type: Number, default: 1 },
  description: { type: String, required: true }
})

eventsSchema.plugin(mongooseThumbnailPlugin, {
  name: 'cover'
})

module.exports = restful.model('Event', eventsSchema)
