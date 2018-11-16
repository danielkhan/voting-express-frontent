const zipkin = require('./agent/zipkin')('express-frontend');
const prometheus = require('prom-client');
const gcStats = require('prometheus-gc-stats');
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
const startGcStats = gcStats(prometheus.register); 
startGcStats();
// Probe every 5th second.
collectDefaultMetrics({ timeout: 5000});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const appstatsd = require('appmetrics-statsd').StatsD();
const expressStatsd = require('express-statsd');

const app = express();

app.use(zipkin.middleware());
app.use(expressStatsd());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter(zipkin));

app.get('/prometheus', (req, res) => {
  return res.send(prometheus.register.metrics());
});

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
