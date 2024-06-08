// Load environment variables from .env file
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const express = require('express');
const mongoose = require('mongoose');
const app = express();

console.log(`App running with MONGODB_URI: ${process.env.MONGODB_URI}`);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

// Import routes
const pokemonRoutes = require('./routes/pokemon');
app.use('/api', pokemonRoutes);

// Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the app for testing purposes
module.exports = app;
