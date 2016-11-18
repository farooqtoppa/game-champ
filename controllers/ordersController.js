var express       = require('express'),
router            = express.Router();

var Product       = require('../models/product');
var Order         = require('../models/order');

// Authorize
var authorize = function(req, res, next) {
  if(!req.user || req.user._id.toString() !== req.params.userId.toString()) {
    res.json(401, 'unauthorized')
  }
  else{
    next()
  }
}

// =============================
// CREATE ORDER
// =============================
router.post('/', function(req, res){
  console.log("req.body", req.body);
  Order.create({
    items: req.body.order,
    user: req.body.user
  })
  .then(function(order){
    console.log(order);
    res.json(order);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

router.get('/:userId', authorize, function(req, res){
  Order.find({"user._id": req.params.userId}).exec()
  .then(function(order){
    console.log(req.params.userId);
    console.log(order);
    res.json(order);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});





module.exports = router;
