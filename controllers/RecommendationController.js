const recommendationsData = require('../data/recommendations.json');

const ImageController = require('./ImageController');

const get_recommendation = async (req, res) => {
  const randomIndex = Math.floor(Math.random() * recommendationsData.length);
  const recommendation = recommendationsData[randomIndex];

  const img = await ImageController.get_image_by_name_from_database(recommendation.name.toLowerCase());

  return res.status(200).json({
    ...recommendation,
    img,
  });
};

module.exports = {
  get_recommendation,
};
