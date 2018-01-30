const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const swaggerJSDoc = require('swagger-jsdoc');

// const multer = require('multer');

// const upload = multer({ dest: path.join(__dirname, 'uploads') });

dotenv.load({ path: '.env' });

const app = express();

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'APP_NAME',
    version: '1.0.0',
    description: 'APP_DESCRIPTION',
  },
  host: 'localhost:5000',
  basePath: '/api',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./api/routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.set('host', '0.0.0.0');
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: 'APP_SECRET',
  resave: false,
  cookie: { maxAge: 60000 },
  saveUninitialized: false,
}));
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

const routes = require('./api/routes');

routes(app);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.use(errorHandler());

module.exports = app;