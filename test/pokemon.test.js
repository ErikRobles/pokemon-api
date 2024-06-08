process.env.NODE_ENV = 'test';

require('dotenv').config({ path: '.env.test' });

console.log(`Running tests with MONGODB_URI: ${process.env.MONGODB_URI}`);

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Import the app

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect(); // Ensure mongoose is disconnected
});

describe('Pokemon API', () => {
    it('should fetch and save a Pokémon', async () => {
        const response = await request(app).post('/api/pokemon/pikachu');
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('pikachu');
    });

    it('should list all saved Pokémon', async () => {
        const response = await request(app).get('/api/pokemons');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should delete a Pokémon by ID', async () => {
        const pokemon = await request(app).post('/api/pokemon/charmander');
        const response = await request(app).delete(`/api/pokemon/id/${pokemon.body.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Pokémon deleted successfully');
    });

    it('should delete a Pokémon by name', async () => {
        await request(app).post('/api/pokemon/bulbasaur');
        const response = await request(app).delete('/api/pokemon/name/bulbasaur');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Pokémon deleted successfully');
    });

    it('should delete Pokémon by type', async () => {
        await request(app).post('/api/pokemon/butterfree');
        const response = await request(app).delete('/api/pokemon/type/bug');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Pokémon deleted successfully');
    });
});
