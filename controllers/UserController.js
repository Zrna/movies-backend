const { User } = require('../models');
const { getUserIdFromRequest } = require('../utils/user');

const get_account = async (req, res) => {
  const userId = getUserIdFromRequest(req);

  const user = await User.findOne({
    where: {
      id: userId,
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

const update_account = (req, res) => {
  const userId = getUserIdFromRequest(req);

  const { firstName, lastName } = req.body;

  if (!firstName) {
    return res.status(422).json({
      error: "First name can't be empty",
    });
  }

  if (!lastName) {
    return res.status(422).json({
      error: "Last name can't be empty",
    });
  }

  User.update(
    {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    },
    {
      where: {
        id: userId,
      },
    }
  )
    .then(() => {
      User.findOne({
        where: {
          id: userId,
        },
      })
        .then(user => {
          const { id, email, firstName, lastName, createdAt, updatedAt } = user.dataValues;

          return res.status(200).json({
            id,
            email,
            firstName,
            lastName,
            createdAt,
            updatedAt,
          });
        })
        .catch(() =>
          res.status(500).json({
            error: 'Something went wrong with updating the account data.',
          })
        );
    })
    .catch(() =>
      res.status(500).json({
        error: 'Update Account data error',
      })
    );
};

const delete_account = (req, res) => {
  const userId = getUserIdFromRequest(req);

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
  update_account,
  delete_account,
};
