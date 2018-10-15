const express = require('express');
const router = express.Router();
const axios = require('axios');

const votes = {
  spaces: [],
  tabs: [],
};

router.get('/', async (req, res, next) => {
  try {

    if(req.query.choice && req.query.choice === 'spaces' || req.query.choice === 'tabs') {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      votes[req.query.choice].push(ip);
    }
    res.render('index', { votes });
    // const httpres = await axios.get('http://localhost:3001');
  } catch(err) {
    return next(err);
  }
});



module.exports = router;
