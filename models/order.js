var mongoose          = require('mongoose');

var OrderItemSchema   = require('./orderitem').schema;
var UserSchema        = require('./user').schema;

OrderItemSchema.virtual('subtotal').get(function(){
  return this.quantity * this.product.price;
})
