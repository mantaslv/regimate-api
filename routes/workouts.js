const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { createWorkout, getWorkouts, deleteWorkout } = require('../controllers/workoutController');

const router = express.Router();

router.use(requireAuth);

router.post('/', createWorkout);
router.get('/', getWorkouts);
router.delete('/:id', deleteWorkout);

module.exports = router;