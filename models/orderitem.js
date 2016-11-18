var mongoose = require('mongoose');

var ProductSchema = require('./product').schema;

var OrderItemSchema = new mongoose.Schema({
  quantity: Number,
  product: ProductSchema
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});
OrderItemSchema.virtual('subtotal').get(function(){
  return this.quantity * this.product.price;
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);
