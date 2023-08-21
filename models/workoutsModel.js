const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    weight: String,
    reps: String
});

const exerciseSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    exerciseName: {
        type: String,
        required: true
    },
    sets: [setSchema]
});

const workoutSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    workoutName: {
        type: String,
        required: false,
    },
    exercises: [exerciseSchema]
}, { timestamps: true });

const programmeSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    programmeName: {
        type: String,
        required: false,
    },
    workouts: [workoutSchema]
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);
const Programme = mongoose.model('Programme', programmeSchema);

module.exports = { Workout, Programme };