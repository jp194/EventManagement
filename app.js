var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

const mongoose=require('mongoose');


var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var changePasswordRouter = require('./routes/changePassword');
var createEventsRouter = require('./routes/createEvents');
var eventsRouter = require('./routes/events');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/changePassword',changePasswordRouter);
app.use('/createEvents',createEventsRouter);
app.use('/events',eventsRouter);


mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
 
  useUnifiedTopology: true
})
.then((db)=>{
   console.log("Succesfully connected to Event Management Database");
},(err)=>{
  console.log(err);
});


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
