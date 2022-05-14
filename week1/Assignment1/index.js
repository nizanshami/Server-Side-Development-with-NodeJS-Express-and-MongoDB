const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const port = 3000;
const hostname = 'localhost';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json())

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Conent-Type', 'text/html');
    res.end('<html><body><h1> This is an express server</h1></body></html>');
})

app.listen(port, hostname, () => {
    console.log(`server on http://${hostname}:${port}/`);
});