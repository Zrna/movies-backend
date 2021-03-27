const express = require('express');

const AuthController = require('../controllers/AuthController');

const router = express.Router();

/**
 * @swagger
 * /register:
 *  post:
 *    summary: Register user
 *    description: Register user
 *    requestBody:
 *      description: Register user
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: example@email.com
 *              password:
 *                type: string
 *                example: abc123
 *    responses:
 *      201:
 *        description: User created
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: "User registered"
 *      409:
 *        description: Email already registered
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: This email is already registered
 *      422:
 *        description: Error message `Password can't be empty` or `Email can't be empty`
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Password can't be empty
 *      500:
 *        description: User registration failed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: some error message
 */
router.post('/register', AuthController.auth_register);

module.exports = router;
