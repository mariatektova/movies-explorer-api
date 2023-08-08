const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const errorController = require('./middlewares/errorController');

const router = require('./routes');
const connectDB = require('./db');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/notFound');

const { PORT = 3000 } = process.env;
const app = express();

const urlList = ['http://mariatektova.diploma.nomoredomains.rocks/', 'https:///mariatektova.diploma.nomoredomains.rocks/'];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (urlList.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', '*');
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());


app.use(requestLogger);

app.use(limiter);
app.use(router);

app.use((req, res, next) => {
  next(new NotFound('Такого пути не существует'));
});

app.use(errorLogger);
app.use(errors());

app.use(errorController);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
