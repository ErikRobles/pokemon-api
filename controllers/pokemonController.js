const axios = require('axios');
const Pokemon = require('../models/pokemon');
const NodeCache = require('node-cache');
const { Mutex } = require('async-mutex');

const cache = new NodeCache({ stdTTL: 600 }); // Cache TTL is 600 seconds (10 minutes)
const pokemonMutex = new Mutex();

const fetchAndSavePokemon = async (name) => {
    console.log(`Fetching and saving Pokémon: ${name}`);
    const release = await pokemonMutex.acquire();
    try {
        if (cache.has(name)) {
            console.log(`Serving cached Pokémon with name: ${name}`);
            return cache.get(name);
        }

        console.log(`Making request to PokeAPI for Pokémon: ${name}`);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const data = response.data;

        const newPokemon = new Pokemon({
            id: data.id,
            name: data.name,
            moves: data.moves.slice(0, 4).map(move => move.move.name),
            types: data.types.map(type => type.type.name)
        });

        console.log(`Saving Pokémon to database: ${name}`);
        await newPokemon.save();
        cache.set(name, newPokemon);
        console.log(`Successfully fetched and saved Pokémon with name: ${name}`);
        return newPokemon;
    } catch (error) {
        console.error(`Error fetching Pokémon: ${error.message}`);
        throw error;
    } finally {
        release();
    }
};


const getAllPokemon = async (req, res) => {
    try {
        console.log(`Retrieving all Pokémon`);
        const pokemons = await Pokemon.find();
        if (!pokemons.length) {
            console.log(`No Pokémon found in the database.`);
            return res.status(404).json({ message: 'No Pokémon found' });
        }
        console.log(`Successfully retrieved all Pokémon`);
        res.status(200).json(pokemons);
    } catch (error) {
        console.error(`Error retrieving Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getPokemonByName = async (req, res) => {
    const { name } = req.params;
    console.log(`Retrieving Pokémon by name: ${name}`);
    try {
        const pokemon = await Pokemon.findOne({ name: name.toLowerCase() });
        if (!pokemon) {
            console.log(`No Pokémon found with name: ${name}`);
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        console.log(`Successfully retrieved Pokémon with name: ${name}`);
        res.status(200).json(pokemon);
    } catch (error) {
        console.error(`Error retrieving Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePokemonById = async (req, res) => {
    const { id } = req.params;
    console.log(`Deleting Pokémon by ID: ${id}`);
    try {
        const result = await Pokemon.deleteOne({ id });
        if (result.deletedCount === 0) {
            console.log(`No Pokémon found with ID: ${id}`);
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        console.log(`Successfully deleted Pokémon with ID: ${id}`);
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePokemonByName = async (req, res) => {
    const { name } = req.params;
    console.log(`Deleting Pokémon by name: ${name}`);
    try {
        const result = await Pokemon.deleteOne({ name: name.toLowerCase() });
        if (result.deletedCount === 0) {
            console.log(`No Pokémon found with name: ${name}`);
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        cache.del(name.toLowerCase());
        console.log(`Successfully deleted Pokémon with name: ${name}`);
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePokemonByType = async (req, res) => {
    const { type } = req.params;
    console.log(`Deleting Pokémon by type: ${type}`);
    try {
        const result = await Pokemon.deleteMany({ types: type.toLowerCase() });
        if (result.deletedCount === 0) {
            console.log(`No Pokémon found with type: ${type}`);
            return res.status(404).json({ message: 'No Pokémon found with the specified type' });
        }
        console.log(`Successfully deleted Pokémon with type: ${type}`);
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
