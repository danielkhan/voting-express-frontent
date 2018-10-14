const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const httpres = await axios.get('http://localhost:3001');
    res.render('index', { title: 'Express' });
  } catch(err) {
    return next(err);
  }

});

module.exports = router;
