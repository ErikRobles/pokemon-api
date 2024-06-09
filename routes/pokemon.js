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

router.post('/pokemon/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const pokemon = await fetchAndSavePokemon(name);
        res.status(201).json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/pokemons', getAllPokemon); // This route should match the URL you are trying to access
router.get('/pokemon/:name', getPokemonByName);
router.delete('/pokemon/id/:id', deletePokemonById);
router.delete('/pokemon/name/:name', deletePokemonByName);
router.delete('/pokemon/type/:type', deletePokemonByType);

module.exports = router;
