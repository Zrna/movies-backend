const { sign, verify } = require('jsonwebtoken');

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

const validateToken = (req, res, next) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    return res.status(401).json({
      error: 'Access token is missing',
    });
  }

  try {
    const isValidToken = verify(accessToken, process.env.TOKEN_SECRET);

    if (isValidToken) {
      req.authenticated = true;

      return next();
    }
  } catch (error) {
    return res.status(400).json({
      error: `Validate Token Error: ${error}`,
    });
  }
};

module.exports = {
  createAccessToken,
  validateToken,
};
