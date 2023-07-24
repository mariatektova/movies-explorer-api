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
const cors = require('cors');
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(cors);

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
