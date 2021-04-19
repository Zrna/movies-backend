const { decode } = require('jsonwebtoken');

const { User } = require('../models');

const get_account = async (req, res) => {
  const accessToken = req.cookies['access-token'];
  const decodedToken = decode(accessToken);

  const user = await User.findOne({
    where: {
      id: decodedToken.id,
    },
  });

  const { id, email, firstName, lastName, createdAt, updatedAt } = user.dataValues;

  return res.status(200).json({
    id,
    email,
    firstName,
    lastName,
    createdAt,
    updatedAt,
  });
};

module.exports = {
  get_account,
};
