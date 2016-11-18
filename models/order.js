var mongoose = require('mongoose');

var OrderItemSchema = require('./orderitem').schema;
var UserSchema = require('./user').schema;

OrderItemSchema.virtual('subtotal').get(function(){
  return this.quantity * this.product.price;
})

var OrderSchema = new mongoose.Schema({
  items: [OrderItemSchema],
  user: UserSchema,
  createdAt: Date,
  updatedAt: Date
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});
OrderSchema.virtual('total').get(function(){
  return this.items.map(function(item) {
    return item.subtotal;
  }).reduce(function(m, e){ return m + e; },0);
});
OrderSchema.pre('save', function(next){
  if (!this.createdAt) { this.createdAt = new Date(); }
  this.updatedAt = new Date();
  next();
})

module.exports = mongoose.model('Order', OrderSchema);
