const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '2h'});
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        const _id = user._id

        res.status(200).json({_id, email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};

const signupUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        const _id = user._id

        res.status(201).json({_id, email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};

module.exports = { signupUser, loginUser };