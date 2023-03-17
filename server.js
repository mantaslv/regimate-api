const express = require('express');
const workoutRoutes = require('./routes/workouts');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    req.path, req.method;
    next();
});

app.use('/api/workouts', workoutRoutes);

if (process.env.NODE_ENV !== "test") {
    console.log(process.env.MONGODB_URI);
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        });
    }).catch((error) => console.log(error));
};

module.exports = app;