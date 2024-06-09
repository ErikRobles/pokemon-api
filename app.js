const path = require('path');
require('dotenv').config({ path: process.env.ENV_PATH || path.resolve(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const pokemonRoutes = require('./routes/pokemon');

app.use(cors()); // Enable CORS


console.log(`App running with MONGODB_URI: ${process.env.MONGODB_URI}`);

async function connectToMongoDB() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
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
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
