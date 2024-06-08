const express = require('express');
const { check, validationResult } = require('express-validator');
const { fetchAndSavePokemon, listPokemons, deletePokemonById, deletePokemonByName, deletePokemonByType } = require('../controllers/pokemonController');
const router = express.Router();

// Route to fetch and save Pokémon data
router.post('/pokemon/:name', 
    [check('name').isString().withMessage('Name must be a string')], 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, 
    fetchAndSavePokemon);

// Route to list all saved Pokémon
router.get('/pokemons', listPokemons);

// Route to delete a Pokémon by ID
router.delete('/pokemon/id/:id', 
    [check('id').isNumeric().withMessage('ID must be a number')], 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, 
    deletePokemonById);

// Route to delete a Pokémon by name
router.delete('/pokemon/name/:name', 
    [check('name').isString().withMessage('Name must be a string')], 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, 
    deletePokemonByName);

// Route to delete Pokémon by type
router.delete('/pokemon/type/:type', 
    [check('type').isString().withMessage('Type must be a string')], 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, 
    deletePokemonByType);

module.exports = router;
