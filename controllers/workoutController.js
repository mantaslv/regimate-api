const { Workout } = require('../models/workoutsModel');
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

const getWorkouts = async (req, res) => {
    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({createdAt: -1});

    res.status(200).json(workouts);
};

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    };

    const workout = await Workout.findOneAndDelete({_id: id});
    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    };

    res.status(200).json(workout);
};

module.exports = {
    createWorkout,
    getWorkouts,
    deleteWorkout,
};