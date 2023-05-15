const Exercise = require('../models/exerciseModel');
const mongoose = require('mongoose');

const createExercise = async (req, res) => {
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
        const exercise = await Exercise.create({title, load, sets, reps, user_id});
        res.status(201).json(exercise);
    } catch(error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    };
};

const getExercises = async (req, res) => {
    const user_id = req.user._id;

    const exercises = await Exercise.find({ user_id }).sort({createdAt: -1});

    res.status(200).json(exercises);
};

const getExercise = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such exercise'});
    };

    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
        return res.status(404).json({error: 'No such exercise'});
    }

    res.status(200).json(exercise);
};

const deleteExercise = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such exercise'});
    };

    const exercise = await Exercise.findOneAndDelete({_id: id});
    if (!exercise) {
        return res.status(404).json({error: 'No such exercise'});
    }

    res.status(200).json(exercise);
};

const updateExercise = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such exercise'});
    };

    const exercise = await Exercise.findOneAndUpdate({_id: id}, {...req.body});
    if (!exercise) {
        return res.status(404).json({error: 'No such exercise'});
    }

    res.status(200).json(exercise);
};

module.exports = {
    createExercise,
    getExercises,
    getExercise,
    deleteExercise,
    updateExercise
};