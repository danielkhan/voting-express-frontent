const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', async (req, res, next) => {

  const httpres = axios.get('https://us-central1-sai-research.cloudfunctions.net/http');
  console.log(httpres.response.data);
  res.render('index', { title: 'Express' });
});

module.exports = router;
