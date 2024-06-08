require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'test'}` });

console.log(`Running tests with MONGODB_URI: ${process.env.MONGODB_URI}`);

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Import the app
let server;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    server = app.listen(3001); // Start the server on a different port for testing
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
    server.close(); // Close the server after tests
});

describe('Pokemon API', () => {
    it('should fetch and save a Pokémon', async () => {
        const response = await request(server).post('/api/pokemon/pikachu');
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('pikachu');
    });

    it('should list all saved Pokémon', async () => {
        const response = await request(server).get('/api/pokemons');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should delete a Pokémon by ID', async () => {
        const pokemon = await request(server).post('/api/pokemon/charmander');
        const response = await request(server).delete(`/api/pokemon/id/${pokemon.body.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Pokémon deleted successfully');
    });

    it('should delete a Pokémon by name', async () => {
        await request(server).post('/api/pokemon/bulbasaur');
        const response = await request(server).delete('/api/pokemon/name/bulbasaur');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Pokémon deleted successfully');
    });

    it('should delete Pokémon by type', async () => {
        await request(server).post('/api/pokemon/butterfree');
        const response = await request(server).delete('/api/pokemon/type/bug');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Pokémon deleted successfully');
    });
});
