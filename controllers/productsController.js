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



module.exports = router;
