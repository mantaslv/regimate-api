const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const getExercises = require('../controllers/exerciseDirectoryController');

const router = express.Router();

router.use(requireAuth);

router.get('/', getExercises);

module.exports = router;