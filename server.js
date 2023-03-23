const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

require('dotenv').config();

const app = express();

const corsOptions = {
    origin: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    req.path, req.method;
    next();
});

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV !== "test") {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        });
    }).catch((error) => console.log(error));
};

module.exports = app;