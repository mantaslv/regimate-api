const express = require('express');
const { createWorkout } = require('../controllers/workoutController');

const router = express.Router();

router.post('/', createWorkout);

module.exports = router;