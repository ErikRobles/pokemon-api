const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    id: Number,
    name: String,
    moves: [String],
    types: [String],
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
