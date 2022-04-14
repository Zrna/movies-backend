const { Movie } = require('../models');
const { getUserIdFromRequest } = require('../utils/user');

const ImageController = require('./ImageController');

const get_all_reviews = (req, res) => {
  const userId = getUserIdFromRequest(req);

  Movie.findAll({
    where: {
      userId,
    },
    order: [['updatedAt', 'DESC']],
  })
    .then(async reviews => {
      const reviewsWithImages = await Promise.all(
        reviews.map(async review => {
          const { name } = review;
          const img = await ImageController.get_image_by_name_from_database(name);

          return {
            ...review.dataValues,
            img,
          };
        })
      );

      return res.status(200).json({
        data: reviewsWithImages,
        totalRecords: reviews.length,
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

  const reviewExist = await Movie.findOne({
    where: {
      userId,
      name,
    },
  });

  if (reviewExist) {
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
    .then(review => {
      return res.status(201).json({
        ...review.dataValues,
        img,
      });
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Server Error',
      });
    });
};

const get_review_by_id = (req, res) => {
  const userId = getUserIdFromRequest(req);
  const reviewId = req.params.id;

  Movie.findOne({
    where: {
      id: reviewId,
    },
  })
    .then(async review => {
      if (!review) {
        return res.status(404).json({
          error: `Review with id ${reviewId} not found`,
        });
      }

      if (review.userId !== userId) {
        return res.status(403).json({
          error: 'Forbidden',
        });
      }

      const img = await ImageController.get_image_by_name_from_database(review.name);

      return res.status(200).json({
        ...review.dataValues,
        img,
      });
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Server Error',
      });
    });
};

const update_review_by_id = async (req, res) => {
  const userId = getUserIdFromRequest(req);
  const reviewId = req.params.id;

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
        id: reviewId,
      },
    }
  )
    .then(() => {
      Movie.findOne({
        where: {
          id: reviewId,
        },
      })
        .then(review => {
          if (!review) {
            return res.status(404).json({
              error: `Review with id ${reviewId} not found`,
            });
          }

          if (review.userId !== userId) {
            return res.status(403).json({
              error: 'Forbidden',
            });
          }

          return res.status(200).json(review);
        })
        .catch(err => {
          return res.status(err.status || 404).json({
            error: err.message || 'Review Not Found',
          });
        });
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Server Error',
      });
    });
};

const delete_review_by_id = (req, res) => {
  const userId = getUserIdFromRequest(req);
  const reviewId = req.params.id;

  Movie.destroy({
    where: {
      id: reviewId,
      userId,
    },
  })
    .then(() => {
      return res.status(200).json(true);
    })
    .catch(err => {
      return res.status(err.status || 500).json({
        error: err.message || 'Something went wrong with deleting the review',
      });
    });
};

module.exports = {
  create_review,
  delete_review_by_id,
  get_all_reviews,
  get_review_by_id,
  update_review_by_id,
};
