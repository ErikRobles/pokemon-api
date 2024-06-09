const axios = require('axios');
const Pokemon = require('../models/pokemon');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 }); // Cache TTL is 600 seconds (10 minutes)

const fetchAndSavePokemon = async (req, res) => {
    const { name } = req.params;
    try {
        const cachedData = cache.get(name);
        if (cachedData) {
            return res.status(200).json(cachedData);
        }

        const response = await axios.get(`${process.env.POKEAPI_URL}/${name}`);
        const pokemonData = response.data;

        const newPokemon = new Pokemon({
            id: pokemonData.id,
            name: pokemonData.name,
            moves: pokemonData.moves.slice(0, 4).map(move => move.move.name),
            types: pokemonData.types.map(type => type.type.name)
        });

        await newPokemon.save();
        cache.set(name, newPokemon);

        res.status(201).json(newPokemon);
    } catch (error) {
        console.error(`Error fetching or saving Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllPokemon = async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.status(200).json(pokemons);
    } catch (error) {
        console.error(`Error listing Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPokemonByName = async (req, res) => {
    const { name } = req.params;
    try {
        const pokemon = await Pokemon.findOne({ name: name.toLowerCase() });
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.status(200).json(pokemon);
    } catch (error) {
        console.error(`Error retrieving Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePokemonById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Pokemon.deleteOne({ id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePokemonByName = async (req, res) => {
    const { name } = req.params;
    try {
        const result = await Pokemon.deleteOne({ name: name.toLowerCase() });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePokemonByType = async (req, res) => {
    const { type } = req.params;
    try {
        const result = await Pokemon.deleteMany({ types: type.toLowerCase() });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No Pokémon found with the specified type' });
        }
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    fetchAndSavePokemon,
    getAllPokemon,
    getPokemonByName,
    deletePokemonById,
    deletePokemonByName,
    deletePokemonByType
};
