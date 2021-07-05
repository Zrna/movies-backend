const axios = require('axios');

const { Image } = require('../models');

const get_image_by_name_from_database = name => {
  return Image.findOne({
    where: {
      name,
    },
  })
    .then(res => {
      return res?.dataValues?.img ?? null;
    })
    .catch(err => {
      console.log('Can not get image from Image table', err);
      return null;
    });
};

const get_image_by_name_from_api = async name => {
  console.log('Making image API request...');
  return await axios
    .get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${name}`)
    .then(async res => {
      const imgUrl = res.data.Poster;
      console.log('Image url:', imgUrl);

      return await Image.create({
        name,
        img: imgUrl,
      }).then(({ img }) => {
        return img;
      });
    })
    .catch(err => {
      console.log('Can not get image from API', err);
    });
};

module.exports = {
  get_image_by_name_from_api,
  get_image_by_name_from_database,
};
