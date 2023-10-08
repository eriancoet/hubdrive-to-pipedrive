const express = require('express');
const serverless = require('serverless-http');
const app = express();
const userRoutes = require('./userRoutes');



app.use(express.json());

app.use('/users', userRoutes);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/data', (req, res) => {
    res.json({ message: 'Data received', data: req.body });
});


const router = express.Router();

router.get('/hello', (req, res) => {
    res.json({
        hello: 'world'
    });
});

app.use('/.netlify/functions/api', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
