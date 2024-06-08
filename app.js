require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const express = require('express');
const mongoose = require('mongoose');
const app = express();

console.log(`App running with MONGODB_URI: ${process.env.MONGODB_URI}`);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('connection error:', err);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

// Import routes
const pokemonRoutes = require('./routes/pokemon');
app.use('/api', pokemonRoutes);

// Default route for root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Pokémon API! Use /api to access the API endpoints.');
});

// Catch-all route for debugging 404s
app.get('*', (req, res) => {
    res.status(404).send('404 Not Found: This route does not exist.');
});

// Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
}
//Adding more logging 
// Export the app for testing purposes
module.exports = app;
