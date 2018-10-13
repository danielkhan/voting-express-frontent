const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', async (req, res, next) => {

  const httpres = await axios.get('http://localhost:3001');
  res.render('index', { title: 'Express' });
});

module.exports = router;
