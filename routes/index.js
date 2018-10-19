const express = require('express');
const router = express.Router();
const axios = require('axios');
const wrapRequest = require('zipkin-instrumentation-request');
const request = require('request');

const votes = {
  spaces: [],
  tabs: [],
};

module.exports = (tracer) => {
  router.get('/', async (req, res, next) => {
    try {
      const str = new Array(1000).join('*');
      if (req.query.choice && req.query.choice === 'spaces' || req.query.choice === 'tabs') {
        votes[req.query.choice].push(str);
      }
      res.render('index', {
        spaces: votes.spaces.length,
        tabs: votes.tabs.length,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/zipkin', (req, res, next) => {
    const host = req.headers['host'];
    return res.redirect(`http://${host}:9411`);
  });

  router.get('/grafana', (req, res, next) => {
    const host = req.headers['host'];
    return res.redirect(`http://${host}:8080`);
  });

  router.get('/bg', async (req, res, next) => {
    try {

      const zkrequest = wrapRequest(request, { tracer, remoteServiceName: 'service-gateway' })

      if (req.query.choice && req.query.choice !== 'spaces' && req.query.choice !== 'tabs') {
        return res.status(400).end();
      }
      const httpres = zkrequest.get(`http://localhost:3001?choice=${req.query.choice}`, (e, r) => {
        if (e) return next(e);
        return res.render('index', JSON.parse(r.body));
      });
      
    } catch (err) {
      return next(err);
    }
  });

  return router;
}

