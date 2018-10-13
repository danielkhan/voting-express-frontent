const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', async (req, res, next) => {

  const httpres = await axios.get('https://us-central1-sai-research.cloudfunctions.net/http');
  res.render('index', { title: 'Express' });
});

module.exports = router;
