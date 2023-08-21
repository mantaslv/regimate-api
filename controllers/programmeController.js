const { Programme } = require('../models/workoutsModel');
const mongoose = require('mongoose');

const createProgramme = async (req, res) => {
    try {
        const user_id = req.user._id
        const programme = await Programme.create({...req.body, user_id});
        res.status(201).json(programme);
    } catch(error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    };
};

const getProgrammes = async (req, res) => {
    const user_id = req.user._id;

    const programmes = await Programme.find({ user_id }).sort({createdAt: -1});

    res.status(200).json(programmes);
};

const deleteProgramme = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such programme'});
    };

    const programme = await Programme.findOneAndDelete({_id: id});
    if (!programme) {
        return res.status(404).json({error: 'No such programme'});
    };

    res.status(200).json(programme);
};

module.exports = {
    createProgramme,
    getProgrammes,
    deleteProgramme,
};