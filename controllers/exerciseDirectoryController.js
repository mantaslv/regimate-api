const ExerciseDirectoryModel = require('../models/exerciseDirectoryModel');
const mongoose = require('mongoose');

const getExerciseDirectory = async (req, res) => {
    try {
        const exercises = await ExerciseDirectoryModel.find({});
        const renamedExercises = exercises.map(exercise => {
            const { name, ...otherProps } = exercise.toObject();
            return { exerciseName: name, ...otherProps };
        });

        res.status(200).json(renamedExercises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createNewExerciseInDirectory = async (req, res) => {
    
};

module.exports = getExerciseDirectory;