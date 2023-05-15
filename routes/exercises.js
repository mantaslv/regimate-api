const express = require('express');
const Exercise = require('../models/exerciseModel');
const {
    createExercise,
    getExercise,
    getExercises,
    deleteExercise,
    updateExercise
} = require('../controllers/exerciseController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getExercises);
router.post('/', createExercise);
router.get('/:id', getExercise);
router.delete('/:id', deleteExercise);
router.patch('/:id', updateExercise);

module.exports = router;