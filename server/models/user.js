const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

// Schema defines how the user data will be stored in MongoDB
var UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

// Export the model
module.exports = restful.model('User', UserSchema)
