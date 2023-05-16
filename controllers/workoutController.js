const Workout = require('../models/workoutModel');

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

const getWorkouts = async (req, res) => {
    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({createdAt: -1});

    res.status(200).json(workouts);
};

module.exports = {
    createWorkout,
    getWorkouts,
};