var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
  email: String,
  password: String,
  joined: Date,
  admin: Boolean
});

module.exports = mongoose.model('User', User );
