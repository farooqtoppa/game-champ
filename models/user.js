var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  address: String,
  city: String,
  state: String,
  zipcode: Number,
  phonenumber: Number,
  email: String,
  cardnumber: Number
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
