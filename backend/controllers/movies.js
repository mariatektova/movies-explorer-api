const Movie = require('../models/movie');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');

const getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.create({ ...req.body, owner: _id })
    .then((newMovie) => {
      res.send(newMovie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Данные переданы некорректно'));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.deleteOne({ _id: req.params._id })
    .then((movie) => {
      if (movie.deletedCount === 0) {
        throw new NotFound('ID фильма не найден');
      }
      return res.send({ message: 'Фильм удален' });
    })
    .catch(next);
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};
