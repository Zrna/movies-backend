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
 *      userId:
 *        type: numner
 *        description: user id
 *        example: 1
 *      name:
 *        type: string
 *        description: movie name
 *        example: Batman
 *      review:
 *        type: string
 *        description: movie review
 *        example: Great movie
 *      rating:
 *        type: ['null', number]
 *        description: movie rating
 *        example: 4
 *      url:
 *        type: ['null', string]
 *        description: movie url
 *        example: https://www.youtube.com/watch?v=-FZ-pPFAjYY
 *      createdAt:
 *        type: string
 *        description: date of creation
 *        example: 2021-05-07T22:00:00.798Z
 *      updatedAt:
 *        type: string
 *        description: update date
 *        example: 2021-05-15T20:26:39.798Z
 *  MovieForbidden:
 *    type: object
 *    properties:
 *      error:
 *        type: string
 *        example: Forbidden
 *  MovieNotFound:
 *    type: object
 *    properties:
 *      error:
 *        type: string
 *        example: Movie with id {id} not found
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
 *                      "rating": 5,
 *                      "url": "https://www.youtube.com/watch?v=Xm12NSa8jsM",
 *                      "createdAt": "2021-05-07T09:05:21.000Z",
 *                      "updatedAt": "2021-05-07T09:05:21.000Z"
 *                    },
 *                    {
 *                      "id": 2,
 *                      "userId": 1,
 *                      "name": "Batman",
 *                      "review": "Not bad",
 *                      "rating": null,
 *                      "url": null,
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
 *      description: Movie that will be added to the database. Rating can be `number` or `null`, URL can be `string` or `null`
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
 *              rating:
 *                type: ['null', number]
 *                example: 5
 *              url:
 *                type: ['null', string]
 *                example: https://www.youtube.com/watch?v=-FZ-pPFAjYY
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

/**
 * @swagger
 * /api/movies/:id:
 *  get:
 *    tags:
 *      - movies
 *    summary: Get movie by id
 *    description: Get movie by `id` from URL params
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Movie id
 *        example: 1
 *    responses:
 *      200:
 *        description: Movie
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MovieResponse'
 *      403:
 *        description: Forbidden - `userId` from cookies and `movie.userId` are not the same
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MovieForbidden'
 *      404:
 *        description: Movie not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MovieNotFound'
 *      500:
 *        description: Some error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MovieServerError'
 */
router.get('/api/movies/:id', validateToken, MovieController.get_movie_by_id);

/**
 * @swagger
 * /api/movies/:id:
 *  put:
 *    tags:
 *      - movies
 *    summary: Update movie by id
 *    description: Update movie by id. Rating can be `number` or `null`, URL can be `string` or `null`
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: movie id
 *        example: 1
 *      - in: body
 *        name: body
 *        required: true
 *        description: body object
 *        schema:
 *          type: object
 *          properties:
 *            review:
 *              type: string
 *              example: Great movie
 *            rating:
 *              type: ['null', number]
 *              example: 4
 *            url:
 *              type: ['null', string]
 *              example: https://www.netflix.com/us/title/80002479
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              review:
 *                type: string
 *                example: Great movie
 *              rating:
 *                type: number
 *                example: 4
 *              url:
 *                type: string
 *                example: https://www.netflix.com/us/title/80002479
 *    responses:
 *      200:
 *        description: Updated success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MovieResponse'
 *      403:
 *        description: Forbidden - `userId` from cookies and `movie.userId` are not the same
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MovieForbidden'
 *      404:
 *        description: Movie not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MovieNotFound'
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *           schema:
 *             $ref: '#/definitions/MovieServerError'
 */
router.put('/api/movies/:id', validateToken, MovieController.update_movie_by_id);

/**
 * @swagger
 * /api/movies/:id:
 *  delete:
 *    tags:
 *      - movies
 *    summary: Delete movie by id
 *    description: Delete movie by id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: movie id
 *        example: 1
 *    responses:
 *      200:
 *        description: Returns `true`
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *           schema:
 *             $ref: '#/definitions/MovieServerError'
 */
router.delete('/api/movies/:id', validateToken, MovieController.delete_movie_by_id);

module.exports = router;
