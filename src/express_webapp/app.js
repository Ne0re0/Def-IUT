// Librairies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Create routes
const indexRouter = require('./routes/index');            // Challenges (list)
const connectRouter = require('./routes/connect');        // Login 
const registerRouter = require('./routes/register');      // Sign up
const disconnectRouter = require('./routes/disconnect');  // Disconnect
const myprofileRouter = require('./routes/myprofile');    // User's profile editor
const scoreboardRouter = require('./routes/scoreboard');  // Global scoreboard
const challengeRouter = require('./routes/challenge');    // Challenge's details   
const userRouter = require('./routes/user');              // User's details 
const adminRouter = require('./routes/admin');            // Admin panel
 


// Generate application instance
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Assign routers
app.use('/', indexRouter);
app.use('/connect', connectRouter);
app.use('/register', registerRouter);
app.use('/disconnect', disconnectRouter);
app.use('/myprofile', myprofileRouter);
app.use('/scoreboard', scoreboardRouter);
app.use('/challenge',  challengeRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
