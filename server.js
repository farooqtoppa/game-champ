// =====================================
// MODULES
// =====================================
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

// create connection to game app db
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/gamechamp';
mongoose.connect(mongoURI);

// Access User Model
var User = require('./models/user');

// =======================================
// MIDDLEWARE / CONFIGURATION
// =======================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(methodOverride('_method'));
