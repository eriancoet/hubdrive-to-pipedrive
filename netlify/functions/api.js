const serverless = require('serverless-http');
const app = require('./server');
const express = require('express');

const router = express.Router();
const path = require('path');

router.get('/netlify/front-end', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'index.html'));
});


app.use('/.netlify/functions/api', router);  // path must route to lambda

module.exports.handler = serverless(app);
