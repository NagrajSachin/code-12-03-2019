const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const router = require('./routes/router');

const port = 3000;
const hostname = 'localhost';
const url = "mongodb://localhost:27017/bank";
const connect = mongoose.connect(url, { useNewUrlParser: true });

connect
.then((db) => console.log('connected to database'))
.catch((err) => console.log(err));

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main', layoutDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/',router);

app.listen(port, hostname, () => console.log(`Listening on ${hostname}:${port}`));
