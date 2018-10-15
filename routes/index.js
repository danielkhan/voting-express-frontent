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
    const str = new Array(100000).join( '*' );
    leak.push(str);
    if(req.query.choice && req.query.choice === 'spaces' || req.query.choice === 'tabs') {
      votes[req.query.choice]++;
    }
    res.render('index', { votes });
    // const httpres = await axios.get('http://localhost:3001');
  } catch(err) {
    return next(err);
  }
});



module.exports = router;
