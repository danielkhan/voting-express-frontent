const express = require('express');
const router = express.Router();
const axios = require('axios');
const leak = [];

const votes = {
  spaces: 0,
  tabs: 0,
};

router.get('/', async (req, res, next) => {
  try {
    const str = new Array(10000).join( '*' );
    // leak.push(str);
    if(req.query.choice && req.query.choice === 'spaces' || req.query.choice === 'tabs') {
      votes[req.query.choice]++;
    }
    res.render('index', votes);
  } catch(err) {
    return next(err);
  }
});


/*
router.get('/', async (req, res, next) => {
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
*/

    // const httpres = await axios.get('http://localhost:3001');

module.exports = router;
