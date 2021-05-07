const { Movie } = require('../models');
const { getUserIdFromRequest } = require('../utils/user');

const get_all_movies = (req, res) => {
  const userId = getUserIdFromRequest(req);

  Movie.findAll({
    where: {
      userId,
    },
  })
    .then(movies => {
      return res.status(200).json({
        movies,
        totalRecords: movies.length,
      });
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Server Error',
      });
    });
};

const create_review = async (req, res) => {
  const userId = getUserIdFromRequest(req);

  const name = req.body.name.trim();
  const review = req.body.review.trim();

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
    review,
    userId,
  })
    .then(movie => {
      return res.status(201).json(movie);
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Server Error',
      });
    });
};

module.exports = {
  create_review,
  get_all_movies,
};
