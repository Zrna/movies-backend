const { sign } = require('jsonwebtoken');

const createAccessToken = user => {
  const accessToken = sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.TOKEN_SECRET
  );

  return accessToken;
};

module.exports = {
  createAccessToken,
};
