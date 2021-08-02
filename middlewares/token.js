const { verify } = require('jsonwebtoken');

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
  validateToken,
};
