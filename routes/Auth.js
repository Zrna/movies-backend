const express = require('express');

const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', AuthController.auth_register);

module.exports = router;
