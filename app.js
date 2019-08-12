const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
var cors = require('cors')
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Boba shops Network',
}));

module.exports = app;
