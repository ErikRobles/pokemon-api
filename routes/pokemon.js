const express = require('express');
const router = express.Router();
const {
    fetchAndSavePokemon,
    getAllPokemon,
    getPokemonByName,
    deletePokemonById,
    deletePokemonByName,
    deletePokemonByType
} = require('../controllers/pokemonController');

// Routes
router.post('/pokemon/:name', fetchAndSavePokemon);
router.get('/pokemons', getAllPokemon);
router.get('/pokemon/name/:name', getPokemonByName);
router.delete('/pokemon/id/:id', deletePokemonById);
router.delete('/pokemon/name/:name', deletePokemonByName);
router.delete('/pokemon/type/:type', deletePokemonByType);

module.exports = router;
