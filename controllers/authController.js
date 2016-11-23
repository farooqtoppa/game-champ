var express = require('express');
var router = express.Router();
var passport =  require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');

// =====================================
// SIGN UP
// =====================================
router.post('/signup', function(req, res) {
  // Register New User
  User.register(new User(
    // username and password (textfields must match)
    { username : req.body.username, address: req.body.address, cardnumber: req.body.cardnumber}),
    req.body.password, function(err, user) {

      // In case of error send obj
      if (err) return res.json({ user : user });

      // Success
      res.json({status: 201, message: 'success', user: user});
    });
});

// ===================================
// LOG IN
// ===================================
router.post('/login', passport.authenticate('local'), function(req,res){
  req.session.save(function(err){
    if(err) return next(err);
    res.json({status: 200, message: 'ok', user: req.user});
  });
});

router.get('/', (req,res) => {
  var query = User.find({});

  query.then(function(users){
    res.json({users: users, user: req.user})
  })
  .catch(function(err){
    console.log(err)
  });
});

// ====================================
// LOG OUT
// ====================================
router.delete('/logout', function(req,res){
  req.logout();
  res.json({status: 202, message: 'no content'});
})

// =======================================
// CREDENTIAL CHECK
// =======================================
var authorize = function(req, res, next) {
  if(!req.user || req.user._id != req.params.id){
    res.json(401, 'unauthorized')
  }
  else{
    next()
  }
};

// router.get('/:id', authorize, function(req,res){
//   var query = User.findById({_id: req.params.id})
//
//   query.then(function(user){
//     res.json(user)
//   })
//   .catch(function(err){
//     res.json({message: 'nope' + err});
//   });
// });

// ===========================
// USER UPDATE PASSWORD
// ===========================
router.patch('/:id/reset', function(req,res){
  console.log('this is the password', req.body.password);
  User.findById(req.params.id).exec()
  .catch(function(err){
    console.log(err);
  })
  .then(function(user){
    if(req.body.password){
      user.setPassword(req.body.password, function(){
        user.save();
        console.log('password changed');
        res.json({status:200, user: user })
      })
    }
    else{
      res.json({status: 406})
    }
  })
});


module.exports = router;
