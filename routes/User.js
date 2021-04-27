const express = require('express');

const UserController = require('../controllers/UserController');
const { validateToken } = require('../utils/token');

const router = express.Router();

/**
 * @swagger
 * /api/account:
 *  get:
 *    tags:
 *      - account
 *    summary: Get account data
 *    description: Required `access-token` in cookies
 *    responses:
 *      200:
 *        description: User account data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  example: 1
 *                email:
 *                  type: string
 *                  example: zrna@gmail.com
 *                firstName:
 *                  type: string
 *                  example: Luka
 *                lastName:
 *                  type: string
 *                  example: Zrnic
 *                createdAt:
 *                  type: string
 *                  example: 2021-04-18T10:02:07.000Z
 *                updatedAt:
 *                  type: string
 *                  example: 2021-04-18T10:02:07.000Z
 *      401:
 *        description: No `access-token` in cookies
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Access token is missing
 */
router.get('/api/account', validateToken, UserController.get_account);

/**
 * @swagger
 * /api/account:
 *  delete:
 *    tags:
 *      - account
 *    summary: Delete account
 *    description: Required `access-token` in cookies
 *    responses:
 *      200:
 *        description: Account deleted - returns `true`
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Something went wrong with deleting account with id {userId}
 */
router.delete('/api/account', validateToken, UserController.delete_account);

module.exports = router;
