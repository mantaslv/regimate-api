const express = require('express');
const getExercises = require('../controllers/exerciseDirectoryController');

const router = express.Router();

router.get('/', getExercises);

module.exports = router;