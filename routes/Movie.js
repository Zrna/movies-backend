const express = require('express');

const MovieController = require('../controllers/MovieController');
const { validateToken } = require('../utils/token');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *  MovieResponse:
 *    type: object
 *    properties:
 *      id:
 *        type: number
 *        description: movie id
 *        example: 1
 *      name:
 *        type: string
 *        description: movie name
 *        example: Batman
 *      review:
 *        type: string
 *        description: movie review
 *        example: Great movie
 *      userId:
 *        type: numner
 *        description: user id
 *        example: 1
 *      createdAt:
 *        type: string
 *        description: date of creation
 *        example: 2021-05-07T22:00:00.798Z
 *      updatedAt:
 *        type: string
 *        description: update date
 *        example: 2021-05-15T20:26:39.798Z
 *  MovieServerError:
 *    type: object
 *    properties:
 *      error:
 *        type: string
 *        example: some error message
 */

/**
 * @swagger
 * /api/movies:
 *  get:
 *    tags:
 *      - movies
 *    summary: Get all user's movies
 *    description: Get all user's movies based on `access-token` from cookies
 *    responses:
 *      200:
 *        description: User's reviews
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                movies:
 *                  type: array
 *                  items: object
 *                  example: [
 *                    {
 *                      "id": 1,
 *                      "userId": 1,
 *                      "name": "Bad Boys",
 *                      "review": "Good Movie",
 *                      "createdAt": "2021-05-07T09:05:21.000Z",
 *                      "updatedAt": "2021-05-07T09:05:21.000Z"
 *                    },
 *                    {
 *                      "id": 2,
 *                      "userId": 1,
 *                      "name": "Batman",
 *                      "review": "Not bad",
 *                      "createdAt": "2021-05-07T09:06:02.000Z",
 *                      "updatedAt": "2021-05-07T09:06:02.000Z"
 *                    },
 *                  ]
 *                totalRecords:
 *                  type: number
 *                  example: 2
 *      500:
 *        description: Some error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MovieServerError'
 */
router.get('/api/movies', validateToken, MovieController.get_all_movies);

/**
 * @swagger
 * /api/movies:
 *  post:
 *    tags:
 *      - movies
 *    summary: Create review
 *    description: Required `access-token` in cookies
 *    requestBody:
 *      description: Movie that will be added to the database
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Batman
 *              review:
 *                type: string
 *                example: Great movie
 *    responses:
 *      201:
 *        description: Review created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MovieResponse'
 *      409:
 *        description: Review for the movie already exists
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Review for 'Batman' already exists
 *      422:
 *        description: Two types `Name can't be empty` or `Review can't be empty`
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Name can't be empty
 *      500:
 *        description: Some error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MovieServerError'
 */
router.post('/api/movies', validateToken, MovieController.create_movie_review);

module.exports = router;
