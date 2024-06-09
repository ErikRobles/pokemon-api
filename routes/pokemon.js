const express = require('express');
const router = express.Router();
const axios = require('axios');
const Pokemon = require('../models/pokemon');

router.post('/pokemon/:name', async (req, res) => {
    const { name } = req.params;
    console.log(`Fetching Pokémon: ${name}`);

    try {
        const response = await axios.get(`${process.env.POKEAPI_URL}/${name}`);
        const pokemonData = response.data;

        const newPokemon = new Pokemon({
            id: pokemonData.id,
            name: pokemonData.name,
            moves: pokemonData.moves.slice(0, 4).map(move => move.move.name),
            types: pokemonData.types.map(type => type.type.name)
        });

        await newPokemon.save();
        res.status(201).json(newPokemon);
    } catch (error) {
        console.error(`Error fetching or saving Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/pokemons', async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.status(200).json(pokemons);
    } catch (error) {
        console.error(`Error listing Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/pokemon/id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Pokemon.deleteOne({ id: id });
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/pokemon/name/:name', async (req, res) => {
    const { name } = req.params;
    try {
        await Pokemon.deleteOne({ name: name });
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/pokemon/type/:type', async (req, res) => {
    const { type } = req.params;
    try {
        await Pokemon.deleteMany({ types: type });
        res.status(200).json({ message: 'Pokémon deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Pokémon: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
