const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

// Fetch and save a Pokémon
router.post('/pokemon/:name', pokemonController.fetchPokemon);

// List all saved Pokémon
router.get('/pokemons', pokemonController.getAllPokemon);

// Delete a Pokémon by ID
router.delete('/pokemon/id/:id', pokemonController.deletePokemonById);

// Delete a Pokémon by name
router.delete('/pokemon/name/:name', pokemonController.deletePokemonByName);

// Delete Pokémon by type
router.delete('/pokemon/type/:type', pokemonController.deletePokemonByType);

module.exports = router;
