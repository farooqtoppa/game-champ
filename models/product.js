var mongoose  = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  imageurl: String
});

module.exports = mongoose.model('product', productSchema);
