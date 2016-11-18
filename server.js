// ==================================
// MODULES
// ==================================
var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var logger          = require('morgan');
var methodOverride  = require('method-override');
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var port            = process.env.PORT || 4000;
var app             = express();

mongoose.Promise = global.Promise;

// create connection to store app db
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/storeapp';
mongoose.connect(mongoURI);

// Access User Model
var User = require('./models/user');

// ==================================
// MIDDLEWARE / CONFIGURATION
// ===================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// =================================
// ROUTING MIDDLEWARE
// ==================================
app.use('/api/users', require('./controllers/authController.js'));
app.use('/api/products', require('./controllers/productsController.js'));
app.use('/api/orders', require('./controllers/ordersController.js'));

app.use(function(req, res, next){
  res.redirect("/");
});

app.listen(port, function(){
  console.log('=======================');
  console.log('Running on port ' + port);
  console.log('========================');
});
