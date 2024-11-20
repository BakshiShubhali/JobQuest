var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sequelize = require('./src/config/db.js');
const userRoutes = require('./src/routes/userRoutes.js');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
const PORT = process.env.port || 3333;
app.listen(PORT, () => {
  console.error("app has been started at port: " + PORT);
});

(async () => {
    try 
    {
      await sequelize.sync({ force: false }); // Sync models with database
      // app.listen(PORT, () => {
      //   console.log(`Server is running on port ${PORT}`);
      // });
    } 
    catch (error) {
      console.error('Error starting the server:', error);
    }
  })();


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