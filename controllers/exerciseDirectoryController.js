const ExerciseDirectoryModel = require('../models/exerciseDirectoryModel');
const mongoose = require('mongoose');

const getExercises = async (req, res) => {
    const exercises = await ExerciseDirectoryModel.find({});

    res.status(200).json(exercises);
};

module.exports = getExercises;