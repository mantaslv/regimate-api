const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

const createWorkout = async (req, res) => {
    try {
        const user_id = req.user._id
        const workout = await Workout.create({...req.body, user_id});
        res.status(201).json(workout);
    } catch(error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    createWorkout,
};