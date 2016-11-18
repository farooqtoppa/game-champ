var express     = require('express'),
router          = express.Router();

var Product     = require('../models/product');

var authorize = function(req, res, next) {
  if(!req.user) {
    res.json(401, 'unauthorized')
  }
  else{
    next()
  }
}

//==============================
// INDEX ALL PRODUCTS
// =============================
router.get('/', function(req, res) {
  var query = Product.find({});
  query.then(function(products) {
    res.json({ products: products, user: req.user});
  })
  .catch(function(err){
    res.status(500);
  })
})



module.exports = router;
