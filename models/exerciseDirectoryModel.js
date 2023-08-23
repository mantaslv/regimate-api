const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseDirectorySchema = new Schema({
    name: String,
    force: String,
    level: String,
    mechanic: String,
    equipment: String,
    primaryMuscles: [String],
    secondaryMuscles: [String],
    instructions: [String],
    category: String
});

const ExerciseDirectoryModel = mongoose.model('ExerciseDirectory', exerciseDirectorySchema);

module.exports = { ExerciseDirectoryModel };