const bcrypt = require('bcrypt');

const { User } = require('../models');

const auth_register = async (req, res) => {
  const { email, password } = req.body;

  const emailExist = await User.findOne({
    where: {
      email,
    },
  });

  if (!password) {
    return res.status(422).json({ error: "Password can't be empty" });
  }

  if (!email) {
    return res.status(422).json({ error: "Email can't be empty" });
  }

  if (emailExist) {
    return res.status(409).json({ error: 'This email is already registered' });
  }

  bcrypt
    .hash(password, 10)
    .then(hashPassword => {
      User.create({
        email,
        password: hashPassword,
      });
    })
    .then(() => {
      return res.status(201).json('User registered');
    })
    .catch(error => {
      if (error) {
        return res.status(500).json({ error });
      }
    });
};

module.exports = {
  auth_register,
};
