const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { createWorkout, getWorkouts } = require('../controllers/workoutController');

const router = express.Router();

router.use(requireAuth);

router.post('/', createWorkout);
router.get('/', getWorkouts);

module.exports = router;