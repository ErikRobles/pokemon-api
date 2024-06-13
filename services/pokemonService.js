const axios = require('axios');
const Pokemon = require('../models/pokemon');
const NodeCache = require('node-cache');
const { Mutex } = require('async-mutex');
const logger = require('../utils/logger');

const cache = new NodeCache({ stdTTL: 600 });
const pokemonMutex = new Mutex();

const fetchAndSavePokemon = async (name) => {
    logger.info(`Fetching and saving Pokémon: ${name}`);
    const release = await pokemonMutex.acquire();
    try {
        if (cache.has(name)) {
            logger.info(`Serving cached Pokémon with name: ${name}`);
            return cache.get(name);
        }

        logger.info(`Making request to PokeAPI for Pokémon: ${name}`);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const data = response.data;

        const newPokemon = new Pokemon({
            id: data.id,
            name: data.name,
            moves: data.moves.slice(0, 4).map(move => move.move.name),
            types: data.types.map(type => type.type.name)
        });

        logger.info(`Saving Pokémon to database: ${name}`);
        await newPokemon.save();
        cache.set(name, newPokemon);
        logger.info(`Successfully fetched and saved Pokémon with name: ${name}`);
        return newPokemon;
    } catch (error) {
        logger.error(`Error fetching Pokémon: ${error.message}`);
        throw error;
    } finally {
        release();
    }
};

const getAllPokemon = async () => {
    try {
        logger.info(`Retrieving all Pokémon`);
        const pokemons = await Pokemon.find();
        if (!pokemons.length) {
            logger.info(`No Pokémon found in the database.`);
            return null;
        }
        logger.info(`Successfully retrieved all Pokémon`);
        return pokemons;
    } catch (error) {
        logger.error(`Error retrieving Pokémon: ${error.message}`);
        throw error;
    }
};

const getPokemonByName = async (name) => {
    logger.info(`Retrieving Pokémon by name: ${name}`);
    try {
        const pokemon = await Pokemon.findOne({ name: name.toLowerCase() });
        if (!pokemon) {
            logger.info(`No Pokémon found with name: ${name}`);
            return null;
        }
        logger.info(`Successfully retrieved Pokémon with name: ${name}`);
        return pokemon;
    } catch (error) {
        logger.error(`Error retrieving Pokémon: ${error.message}`);
        throw error;
    }
};

const deletePokemonById = async (id) => {
    logger.info(`Deleting Pokémon by ID: ${id}`);
    try {
        const result = await Pokemon.deleteOne({ id });
        if (result.deletedCount === 0) {
            logger.info(`No Pokémon found with ID: ${id}`);
            return false;
        }
        logger.info(`Successfully deleted Pokémon with ID: ${id}`);
        return true;
    } catch (error) {
        logger.error(`Error deleting Pokémon: ${error.message}`);
        throw error;
    }
};

const deletePokemonByName = async (name) => {
    logger.info(`Deleting Pokémon by name: ${name}`);
    try {
        const result = await Pokemon.deleteOne({ name: name.toLowerCase() });
        if (result.deletedCount === 0) {
            logger.info(`No Pokémon found with name: ${name}`);
            return false;
        }
        cache.del(name.toLowerCase());
        logger.info(`Successfully deleted Pokémon with name: ${name}`);
        return true;
    } catch (error) {
        logger.error(`Error deleting Pokémon: ${error.message}`);
        throw error;
    }
};

const deletePokemonByType = async (type) => {
    logger.info(`Deleting Pokémon by type: ${type}`);
    try {
        const result = await Pokemon.deleteMany({ types: type.toLowerCase() });
        if (result.deletedCount === 0) {
            logger.info(`No Pokémon found with type: ${type}`);
            return false;
        }
        logger.info(`Successfully deleted Pokémon with type: ${type}`);
        return true;
    } catch (error) {
        logger.error(`Error deleting Pokémon: ${error.message}`);
        throw error;
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
