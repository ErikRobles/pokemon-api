require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const pokemonRoutes = require('./routes/pokemon');

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

module.exports = app;
