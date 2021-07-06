const axios = require('axios');

const { Image } = require('../models');
const { getBase64 } = require('../utils/image');

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

      // `imgUrl` can also be `N/A`
      if (imgUrl && imgUrl.startsWith('http')) {
        const base64Img = await getBase64(imgUrl);

        return await Image.create({
          name,
          img: base64Img,
        }).then(({ img }) => {
          return img;
        });
      }

      return null;
    })
    .catch(err => {
      console.log('Can not get image from API', err);
    });
};

module.exports = {
  get_image_by_name_from_api,
  get_image_by_name_from_database,
};
