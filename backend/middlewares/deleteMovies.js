const Movie = require('../models/movie');
const NotFound = require('../errors/notFound');
const Forbidden = require('../errors/forbidden');

module.exports = (req, res, next) => {
  Movie.findById({ _id: req.params._id })
    .then((movie) => {
      // console.log(movie.owner);
      if (!movie) {
        next(new NotFound('Фильма с указанным id не существует'));
      } else if (movie.owner.toHexString() !== req.user._id) {
        next(
          new Forbidden('Вы не можете удалить чужой фильм'),
        );
      }
      return next();
    })
    .catch(next);
};
