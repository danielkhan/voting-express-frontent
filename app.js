const appzip = require('appmetrics-zipkin')({
  host: 'localhost',
  port: 9411,
  serviceName:'express-frontend',
  sampleRate: 1.0
});

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const appstatsd = require('appmetrics-statsd').StatsD();
const expressStatsd = require('express-statsd');

const indexRouter = require('./routes/index');

const app = express();
app.use(expressStatsd());
const ips = [];



app.use((req, res, next) => {
  const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  const str = new Array(1000).join( '*' );
  ips.push(str);
  return next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
