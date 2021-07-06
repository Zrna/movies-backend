const axios = require('axios');

function getBase64(url) {
  console.log('Image to base64...');
  return axios
    .get(url, {
      responseType: 'arraybuffer',
    })
    .then(response => {
      console.log('Base64 image generated.');
      return Buffer.from(response.data, 'binary').toString('base64');
    })
    .catch(err => {
      console.log('Can not create base64 from image.', err);
    });
}

module.exports = {
  getBase64,
};
