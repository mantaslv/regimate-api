const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

const createWorkout = async (req, res) => {
    const {title, load, sets, reps} = req.body;

    let emptyFields = [];
    if (!title) emptyFields.push('title');
    if (!load) emptyFields.push('load');
    if (!sets) emptyFields.push('sets');
    if (!reps) emptyFields.push('reps');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields});
    };

    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, load, sets, reps, user_id});
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

const getWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    };

    const workout = await Workout.findById(req.params.id);
    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

    res.status(200).json(workout);
};

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    };

    const workout = await Workout.findOneAndDelete({_id: id});
    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

    res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    };

    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body});
    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

    res.status(200).json(workout);
};

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
};