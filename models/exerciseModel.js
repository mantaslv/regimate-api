const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return typeof value === 'string';
            },
            message: 'Title must be a string'
        }
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Exercise', ExerciseSchema);