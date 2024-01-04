const recommendationData = require('../data/recommendation');

const ImageController = require('./ImageController');

const get_recommendation = async (req, res) => {
  const randomIndex = Math.floor(Math.random() * recommendationData.length);
  const recommendation = recommendationData[randomIndex];

  const img = await ImageController.get_image_by_name_from_database(recommendation.name.toLowerCase());

  return res.status(200).json({
    ...recommendation,
    img,
  });
};

module.exports = {
  get_recommendation,
};
