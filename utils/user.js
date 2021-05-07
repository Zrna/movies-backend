const { decode } = require('jsonwebtoken');

const getUserIdFromRequest = req => {
  const accessToken = req.cookies['access-token'];
  const decodedToken = decode(accessToken);

  return decodedToken.id;
};

module.exports = {
  getUserIdFromRequest,
};
