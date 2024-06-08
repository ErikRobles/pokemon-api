const axios = require('axios');
const Pokemon = require('../models/pokemon');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 }); // Cache TTL (time to live) is 600 seconds (10 minutes)

const fetchPokemon = async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    const cacheKey = `pokemon_${pokemonName}`;

    // Check if data is in cache
    if (cache.has(cacheKey)) {
        console.log('Returning cached data');
        return res.status(200).json(cache.get(cacheKey));
    }

    try {
        const response = await axios.get(`${process.env.POKEAPI_URL}${pokemonName}`);
        const { id, name, moves, types } = response.data;

        const pokemon = {
            id,
            name,
            moves: moves.slice(0, 4).map(move => move.move.name),
            types: types.map(type => type.type.name)
        };

        // Save data to cache
        cache.set(cacheKey, pokemon);

        const newPokemon = new Pokemon(pokemon);
        await newPokemon.save();

        res.status(201).json(newPokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllPokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.find();
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Pokemon.deleteOne({ id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePokemonByName = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await Pokemon.deleteOne({ name: name.toLowerCase() });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePokemonByType = async (req, res) => {
    try {
        const { type } = req.params;
        const result = await Pokemon.deleteMany({ types: type.toLowerCase() });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No Pokémon found with the specified type' });
        }
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    fetchPokemon,
    getAllPokemon,
    deletePokemonById,
    deletePokemonByName,
    deletePokemonByType
};
