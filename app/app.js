const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const users = require('./routes/api/v1/users');
const posts = require('./routes/api/v1/posts');
const taggings = require('./routes/api/v1/taggings');

const app = express();

if (process.env.NODE_ENV !== 'test') app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('node_modules/mithril'));

app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);
app.use('/api/v1/taggings', taggings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
