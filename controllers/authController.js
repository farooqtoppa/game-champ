var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

var User = require('../models/user.js');

// ===================================
// SIGN UP
// ===================================
router.post('/signup', function(req, res) {
  // Register new user
  User.register(new User(
    { username: req.body.username }),
    req.body.password, function(err, user) {
      if (err) {
        return res.json({ user: user });
      }
      else{
        res.json({status: 201, message: 'success', user: user});
      }
    });
});








module.exports = router;
