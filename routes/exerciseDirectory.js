const express = require('express');
const getExerciseDirectory = require('../controllers/exerciseDirectoryController');

const router = express.Router();

router.get('/', getExerciseDirectory);

module.exports = router;