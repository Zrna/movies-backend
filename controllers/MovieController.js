const { Movie } = require('../models');
const { getUserIdFromRequest } = require('../utils/user');

const ImageController = require('./ImageController');

const get_all_movies = (req, res) => {
  const userId = getUserIdFromRequest(req);

  Movie.findAll({
    where: {
      userId,
    },
  })
    .then(async movies => {
      const moviesWithImages = await Promise.all(
        movies.map(async movie => {
          const { name } = movie;
          const img = await ImageController.get_image_by_name_from_database(name);

          return {
            ...movie.dataValues,
            img,
          };
        })
      );

      return res.status(200).json({
        data: moviesWithImages,
        totalRecords: movies.length,
      });
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Server Error',
      });
    });
};

const create_movie_review = async (req, res) => {
  const userId = getUserIdFromRequest(req);

  const { name: reqName, rating, review: reqReview, url: reqUrl, watchAgain } = req.body;

  const name = reqName && reqName.trim();
  const review = reqReview && reqReview.trim();
  const url = reqUrl && reqUrl.trim();

  let img = await ImageController.get_image_by_name_from_database(name);

  if (!img) {
    img = await ImageController.get_image_by_name_from_api(name);
  }

  if (!name) {
    return res.status(422).json({
      error: "Name can't be empty",
    });
  }

  if (!review) {
    return res.status(422).json({
      error: "Review can't be empty",
    });
  }

  const movieExist = await Movie.findOne({
    where: {
      userId,
      name,
    },
  });

  if (movieExist) {
    return res.status(409).json({
      error: `Review for '${name}' already exists`,
    });
  }

  Movie.create({
    name,
    rating,
    review,
    url,
    userId,
    watchAgain: watchAgain ?? false,
  })
    .then(movie => {
      return res.status(201).json({
        ...movie.dataValues,
        img,
      });
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Server Error',
      });
    });
};

const get_movie_by_id = (req, res) => {
  const userId = getUserIdFromRequest(req);
  const movieId = req.params.id;

  Movie.findOne({
    where: {
      id: movieId,
    },
  })
    .then(async movie => {
      if (!movie) {
        return res.status(404).json({
          error: `Movie with id ${movieId} not found`,
        });
      }

      if (movie.userId !== userId) {
        return res.status(403).json({
          error: 'Forbidden',
        });
      }

      const img = await ImageController.get_image_by_name_from_database(movie.name);

      return res.status(200).json({
        ...movie.dataValues,
        img,
      });
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Server Error',
      });
    });
};

const update_movie_by_id = async (req, res) => {
  const userId = getUserIdFromRequest(req);
  const movieId = req.params.id;

  const { rating, review: reqReview, url: reqUrl, watchAgain } = req.body;
  const review = reqReview && reqReview.trim();
  const url = reqUrl && reqUrl.trim();

  if (!review) {
    return res.status(422).json({
      error: "Review can't be empty",
    });
  }

  Movie.update(
    {
      rating,
      review,
      url,
      watchAgain,
    },
    {
      where: {
        userId,
        id: movieId,
      },
    }
  )
    .then(() => {
      Movie.findOne({
        where: {
          id: movieId,
        },
      })
        .then(movie => {
          if (!movie) {
            return res.status(404).json({
              error: `Movie with id ${movieId} not found`,
            });
          }

          if (movie.userId !== userId) {
            return res.status(403).json({
              error: 'Forbidden',
            });
          }

          return res.status(200).json(movie);
        })
        .catch(err => {
          return res.status(err.status || 404).json({
            error: err.message || 'Movie Not Found',
          });
        });
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Server Error',
      });
    });
};

const delete_movie_by_id = (req, res) => {
  const userId = getUserIdFromRequest(req);
  const movieId = req.params.id;

  Movie.destroy({
    where: {
      id: movieId,
      userId,
    },
  })
    .then(() => {
      return res.status(200).json(true);
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Something went wrong with deleting the movie',
      });
    });
};

module.exports = {
  create_movie_review,
  delete_movie_by_id,
  get_all_movies,
  get_movie_by_id,
  update_movie_by_id,
};
