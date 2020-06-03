/* Creates by Akhitha Manjitha
   20/05/2020
   asmanjitha@gmail.com
   https://github.com/asmanjitha
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRoutes = require('./routes/auth');

var app = express();

// Body Parser middle ware
app.use(bodyParser.json());

//Initialization
console.log("      //\\\       ||=======          \\\            // ||======== ||=========       //\\       ||==========");
console.log("     //  \\\      ||       ||         \\\          //  ||         ||               //  \\      ||         ");
console.log("    //    \\\     ||       ||          \\\        //   ||         ||              //    \\     ||         ");
console.log("   //======\\\    ||=======             \\\      //    ||=====    ||     ====    //======\\    ||==========");
console.log("  //        \\\   ||\\\                    \\\    //     ||         ||        |   //        \\             ||");
console.log(" //          \\\  ||  \\\                   \\\  //      ||         ||        |  //          \\            ||");
console.log("//            \\\ ||    \\\                  \\\//       ||======== ||========| //            \\ ==========||");

//DB Config
const db = require('./DBConnect/mongoConnect').mongoURI;
//Connect DB
mongoose
    .connect(db)
    .then(()=> console.log("Database Connection established..."))
    .catch(err => console.log("Database Connection Error: " + err));


app.use(passport.initialize());
app.use(passport.session());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRoutes);

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
