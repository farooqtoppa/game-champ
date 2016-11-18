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

// ===================================
// LOG IN
// ===================================
router.post('/login', passport.authenticate('local'), function(req, res) {
  req.session.save(function(err){
    if(err) {
      return next(err);
    }
    else{
      res.json({ status: 200, message: 'ok', user: req.user});
    }
  });
});

router.get('/', (req, res) => {
  var query = User.find({});

  query.then(function(users){
    res.json({ users: users, user: req.user})
  })
  .catch(function(err) {
    console.log(err)
  });
});







module.exports = router;
