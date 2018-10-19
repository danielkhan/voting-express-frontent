const express = require('express');
const router = express.Router();
const axios = require('axios');

const votes = {
  spaces: [],
  tabs: [],
};

router.get('/', async (req, res, next) => {
  try {
    const str = new Array(1000).join( '*' );
    if(req.query.choice && req.query.choice === 'spaces' || req.query.choice === 'tabs') {
      votes[req.query.choice].push(str);
    }
    res.render('index', {
      spaces: votes.spaces.length,
      tabs: votes.tabs.length,
    });
  } catch(err) {
    return next(err);
  }
});

router.get('/zipkin', (err, req, res) => {
  return res.redirect('/:9411');
});

router.get('/grafana', (err, req, res) => {
  return res.redirect('/:8080');
});

router.get('/bg', async (req, res, next) => {
  try {
    if(req.query.choice && req.query.choice !== 'spaces' && req.query.choice !== 'tabs') {
      return res.status(400).end();
    }
    const httpres = await axios.get(`http://localhost:3001?choice=${req.query.choice}`);

    return res.render('index', httpres.data);
  } catch(err) {
    return next(err);
  }
});


    // const httpres = await axios.get('http://localhost:3001');

module.exports = router;
