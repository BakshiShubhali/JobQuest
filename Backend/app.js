var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sequelize = require('./src/config/db.js');
const userRoutes = require('./src/routes/userRoutes.js'); // Import user routes
const jobRoutes = require('./src/routes/jobRoutes.js'); // Import user routes

var app = express();

// View engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use(userRoutes); // Add this line to register the user routes
app.use(jobRoutes); // Job routes

// Catch 404 and forward to error handler (Place after all route registrations)
app.use(function (req, res, next) {
  next(createError(404)); // Pass error to the next middleware if no route matches
});

// Error handler
app.use(function (err, req, res, next) {
   // Set locals for error message and details (only in development)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 // Send error response as JSON
 res.status(err.status || 500).json({ error: err.message });
});

// Sync database and start the server
const PORT = process.env.PORT || 3336;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
});

module.exports = app;