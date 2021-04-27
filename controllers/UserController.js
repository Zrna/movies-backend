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

const delete_account = (req, res) => {
  const accessToken = req.cookies['access-token'];
  const decodedToken = decode(accessToken);
  const userId = decodedToken.id;

  User.destroy({
    where: {
      id: userId,
    },
  })
    .then(() =>
      res
        .status(200)
        .cookie('access-token', '', {
          maxAge: 1,
        })
        .json(true)
    )
    .catch(() =>
      res.status(500).json({
        error: `Something went wrong with deleting account with id ${userId}`,
      })
    );
};

module.exports = {
  get_account,
  delete_account,
};
