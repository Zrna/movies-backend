const express = require('express');

const RecommendationController = require('../controllers/RecommendationController');
const { validateToken } = require('../middlewares/token');

const router = express.Router();

router.use(validateToken);

router.get('/api/recommendation', RecommendationController.get_recommendation);

module.exports = router;
