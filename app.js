const path = require('path');
require('dotenv').config({ path: process.env.ENV_PATH || path.resolve(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const pokemonRoutes = require('./routes/pokemon');
const rateLimit = require('express-rate-limit');
const logger = require('./utils/logger');

// API Route Security
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);
app.use(cors());

logger.info(`App running with MONGODB_URI: ${process.env.MONGODB_URI}`);

async function connectToMongoDB() {
    try {
        logger.info('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        logger.info('Connected to MongoDB');
    } catch (err) {
        logger.error('MongoDB connection error:', err);
    }
}

connectToMongoDB();

app.use(express.json());
app.use('/api', pokemonRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Pokémon API! Use /api to access the API endpoints.');
});

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found: This route does not exist.');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
