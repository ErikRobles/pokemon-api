const {
    fetchAndSavePokemon,
    getAllPokemon,
    getPokemonByName,
    deletePokemonById,
    deletePokemonByName,
    deletePokemonByType
} = require('../services/pokemonService');

const logger = require('../utils/logger');

const getAllPokemonController = async (req, res) => {
    try {
        const pokemons = await getAllPokemon();
        if (!pokemons) {
            return res.status(404).json({ message: 'No Pokémon found' });
        }
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPokemonByNameController = async (req, res) => {
    const { name } = req.params;
    try {
        const pokemon = await getPokemonByName(name);
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePokemonByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deletePokemonById(id);
        if (!result) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePokemonByNameController = async (req, res) => {
    const { name } = req.params;
    try {
        const result = await deletePokemonByName(name);
        if (!result) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePokemonByTypeController = async (req, res) => {
    const { type } = req.params;
    try {
        const result = await deletePokemonByType(type);
        if (!result) {
            return res.status(404).json({ message: 'No Pokémon found with the specified type' });
        }
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const fetchAndSavePokemonController = async (req, res) => {
    const { name } = req.params;
    try {
        const pokemon = await fetchAndSavePokemon(name);
        res.status(201).json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPokemonController,
    getPokemonByNameController,
    deletePokemonByIdController,
    deletePokemonByNameController,
    deletePokemonByTypeController,
    fetchAndSavePokemonController
};
