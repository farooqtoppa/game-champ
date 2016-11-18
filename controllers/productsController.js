var express = require('express'),
    router  = express.Router();

var Product = require('../models/product');

//Authorize User before showing them products
var authorize = function(req,res,next){
  if(!req.user){
    res.json(401, 'unauthorized')
  }
  else{
    next()
  }
}

router.get('/', function(req, res){
  var query = Product.find({});
  query.then(function(products){
    res.json({products: products, user: req.user});
  })
  .catch(function(err){
    res.status(500);
  })
});

router.get('/:id', function(req, res){
  Product.findById(req.params.id).exec()
  .then(function(product){
    console.log(product);
    res.json(product);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});


module.exports = router;
