const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {
    fetchAndSavePokemonController,
    getAllPokemonController,
    getPokemonByNameController,
    deletePokemonByIdController,
    deletePokemonByNameController,
    deletePokemonByTypeController
} = require('../controllers/pokemonController');

router.post('/pokemon/:name', [
    check('name').isString().trim().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await fetchAndSavePokemonController(req, res);
});

router.get('/pokemons', getAllPokemonController);
router.get('/pokemon/:name', getPokemonByNameController);
router.delete('/pokemon/id/:id', deletePokemonByIdController);
router.delete('/pokemon/name/:name', deletePokemonByNameController);
router.delete('/pokemon/type/:type', deletePokemonByTypeController);

module.exports = router;
