const compression = require('compression');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const debug = require('debug')('blog-api:app');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const routeHandler = require('./routes/routeHandler');

const app = express();
app.set('trust proxy', 1); // needed for Railway hosting

// set up mongoose connection
mongoose.set('strictQuery', false);
main()
  .then(() => debug('Connected to MongoDB'))
  .catch((err) => debug('Error connecting to MongoDB:', err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routeHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  debug(err);

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
