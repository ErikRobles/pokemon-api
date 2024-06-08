const axios = require('axios');
const Pokemon = require('../models/pokemon');

const fetchAndSavePokemon = async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    const pokeApiUrl = process.env.POKEAPI_URL;

    try {
        const response = await axios.get(`${pokeApiUrl}${pokemonName}`);
        const { id, name, moves, types } = response.data;

        // Extract the first 4 moves
        const pokemonMoves = moves.slice(0, 4).map(move => move.move.name);

        // Extract types
        const pokemonTypes = types.map(type => type.type.name);

        // Create a new Pokémon instance
        const newPokemon = new Pokemon({
            id,
            name,
            moves: pokemonMoves,
            types: pokemonTypes,
        });

        // Save to the database
        await newPokemon.save();

        res.status(201).send(newPokemon);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).send({ error: error.response.data });
        } else if (error.request) {
            // The request was made but no response was received
            res.status(500).send({ error: 'No response received from PokeAPI' });
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).send({ error: error.message });
        }
    }
};

const listPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.status(200).send(pokemons);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deletePokemonById = async (req, res) => {
    const pokemonId = req.params.id;

    try {
        const result = await Pokemon.deleteOne({ id: pokemonId });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Pokémon not found' });
        }
        res.status(200).send({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deletePokemonByName = async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();

    try {
        const result = await Pokemon.deleteOne({ name: pokemonName });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Pokémon not found' });
        }
        res.status(200).send({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deletePokemonByType = async (req, res) => {
    const pokemonType = req.params.type.toLowerCase();

    try {
        // Find and delete Pokémon by type
        const result = await Pokemon.deleteMany({ types: { $elemMatch: { $eq: pokemonType } } });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'No Pokémon found with the specified type' });
        }
        res.status(200).send({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    fetchAndSavePokemon,
    listPokemons,
    deletePokemonById,
    deletePokemonByName,
    deletePokemonByType,
};
