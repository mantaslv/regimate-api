const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { createWorkout } = require('../controllers/workoutController');

const router = express.Router();

router.use(requireAuth);

router.post('/', createWorkout);

module.exports = router;