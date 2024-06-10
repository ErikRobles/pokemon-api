# Pokemon API

## Overview

This project is a Node.js application that interacts with the PokeAPI to fetch, store, and manage Pokémon data in a MongoDB database. The application provides RESTful API endpoints to perform CRUD operations on Pokémon data.

 ### Live API Base URL
   The live API is hosted at: `https://pokedex-rt82.onrender.com`

## Features

- Fetch and save Pokémon data from PokeAPI.
- List all saved Pokémon.
- Delete Pokémon by ID or name.
- Delete Pokémon by type.

## Additional Features
### Express Validator:
Express-validator is integrated into the application to ensure that incoming requests are properly validated and sanitized. This helps prevent common security vulnerabilities such as SQL injection and XSS attacks by ensuring that the data being processed is clean and conforms to expected formats.
### Rate Limiting:
Rate limiting is implemented to protect the application from abuse and excessive use. It limits the number of requests a client can make in a certain period, helping to prevent denial-of-service (DoS) attacks and ensuring fair usage of the API resources.

## Prerequisites

- Node.js
- MongoDB

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/ErikRobles/pokemon-api.git
cd pokemon-api
```
### 2. Install Dependencies
```sh
npm install
```
### 3. Set Up Environment Variables

Create .env.development and .env.test files in the root directory of your project.

.env.development
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pokemonDB
POKEAPI_URL=https://pokeapi.co/api/v2/pokemon/
```
.env.test

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pokemonDBTest
POKEAPI_URL=https://pokeapi.co/api/v2/pokemon/
```
.env.production
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pokemonDB
POKEAPI_URL=https://pokeapi.co/api/v2/pokemon/
```
### 4. Start the Application
```sh
npm start
```
The server will be created dynamically.

### Running Tests
1. Run Tests
To run the tests, use the following command:

```sh
npm test
```
This will run the test suite using Jest.

## API Documentation
### Postman Collection
**Importing the Postman Collection**
1. Download the Postman Collection File:

* Ensure that the Pokedex API.postman_collection.json file is present in the root directory of the project.
2. Open Postman:

* Launch the Postman application.
3. Import the Collection:

* Click on the Import button in the top left corner of the Postman interface.
* Select the Choose Files tab.
* Navigate to the project directory and select the Pokedex API.postman_collection.json file.
* Click Open to import the collection.

4. Use the Endpoints:

* Once the collection is imported, you will see a list of all the endpoints in the collection.
* You can now easily send requests to the API endpoints using Postman.

**Fetch and Save Pokémon**

**Endpoint:** POST /api/pokemon/:name

**Description:** Fetches data for a given Pokémon name from the PokeAPI and saves it to the MongoDB database.

**Parameters:**

* name: The name of the Pokémon.

__Example Request:__

```sh
POST https://pokedex-rt82.onrender.com/api/pokemon/pikachu
```
Example Response:

```json
{
  "id": 25,
  "name": "pikachu",
  "moves": ["mega-punch", "pay-day", "thunder-punch", "slam"],
  "types": ["electric"]
}
```

### List All Saved Pokémon

**Endpoint:** GET /api/pokemons

**Description:** Lists all Pokémon entries saved in the MongoDB database.

**Example Request:**

```sh
GET https://pokedex-rt82.onrender.com/api/pokemons
```
Example Response:

```json
[
  {
    "id": 25,
    "name": "pikachu",
    "moves": ["mega-punch", "pay-day", "thunder-punch", "slam"],
    "types": ["electric"]
  },
  {
    "id": 1,
    "name": "bulbasaur",
    "moves": ["razor-wind", "swords-dance", "cut", "bind"],
    "types": ["grass", "poison"]
  }
]
```
### Delete Pokémon by ID
**Endpoint:** DELETE /api/pokemon/id/:id

**Description:** Deletes a Pokémon entry from the MongoDB database by its ID.

**Parameters:**

* id: The ID of the Pokémon.

**Example Request:**

```sh
DELETE https://pokedex-rt82.onrender.com/api/pokemon/id/25
```
Example Response:

```json
{
  "message": "Pokémon deleted successfully"
}
```
### Delete Pokémon by Name
**Endpoint:** DELETE /api/pokemon/name/:name

**Description:** Deletes a Pokémon entry from the MongoDB database by its name.

**Parameters:**

* name: The name of the Pokémon.

**Example Request:**

```sh
DELETE https://pokedex-rt82.onrender.com/api/pokemon/name/pikachu
```
Example Response:

```json
{
  "message": "Pokémon deleted successfully"
}
```
### Delete Pokémon by Type
**Endpoint:** DELETE /api/pokemon/type/:type

**Description:** Deletes all Pokémon entries from the MongoDB database that have a specified type.

**Parameters:**

* type: The type of the Pokémon.
**Example Request:**

```sh
DELETE https://pokedex-rt82.onrender.com/api/pokemon/type/bug
```
Example Response:

```json
{
  "message": "Pokémon deleted successfully"
}
```

## Docker Setup

### Prerequisites

- Docker installed on your local machine

### 1. Create a `.env.docker` File

Create a file named `.env.docker` in the root directory of your project with the following content:

```env
PORT=3000
MONGODB_URI=<your_mongodb_uri>
POKEAPI_URL=https://pokeapi.co/api/v2/pokemon/
```
Replace '<your_mongodb_uri>' with your actual MongoDB URI

### 2. Build the Docker Image
Run the following command in the root directory of your project to buid the Docker image:
```sh
sudo docker build -t pokemon-api .
```
### 3. Run the Docker Container
Run the following command to start a container from the image, mapping it to an available port (e.g., 3001 if 3000 is in use):

```sh
sudo docker run -p 3001:3000 -d pokemon-api
```
### 4. Verify the Docker Container
* List Running Containers:

```sh
sudo docker ps
```
* Access the Application:
Open your browser and go to http://localhost:3001 to verify the application is running.

* Check Logs (if needed):
If you need to check the logs for any issues, use:

```sh
sudo docker logs <container_id>
```

* Stop the Container:
If you need to stop the container, use:

```sh
sudo docker stop <container_id>
```

### Notes
* If you encounter permission issues while running Docker commands, prefix the commands with sudo.
* Make sure the MongoDB URI in .env.docker is correctly configured and accessible from the Docker container.

## Running the Tests
This section provides instructions on how to run both the sequential test and the load test for the Pokémon API.

### Sequential Test
The sequential test script tests the basic functionality of creating, retrieving, listing, and deleting a Pokémon sequentially. This script ensures that the core functionality works as expected without race conditions.

**Prerequisites**

* Ensure the Pokémon API server is running locally on port 3000.
* Node.js should be installed on your machine.

**Steps**
1. Navigate to the project directory:

```bash
cd /path/to/your/project
```
2. Run the sequential test:

```bash
node test/sequentialTest.js
```
**Expected Output:**

The script will output logs for each iteration, indicating the success or failure of creating, retrieving, listing, and deleting Pokémon. Example output:

```text
Iteration: 1
Successfully created Pokémon: pikachu
Successfully retrieved Pokémon by name: pikachu
Successfully listed all Pokémon: 15 found
Successfully deleted Pokémon by name: Pokémon deleted successfully
...
Sequential test completed.
```
### Load Test
The load test script tests the performance and stability of the Pokémon API under load. This script simulates multiple users performing various operations on the API.

**Prerequisites**
* Ensure the Pokémon API server is running locally on port 3000.

* Artillery should be installed globally. If not, install it using the following command:

```bash
npm install -g artillery
```
**Steps**

1. Navigate to the project directory:

```bash
cd /path/to/your/project
```
2. Run the load test:

Ensure you have the following configuration in your package.json:

```json
{
  "scripts": {
    "load-test": "artillery run test/load-test.yml"
  }
}
```
Create a file named load-test.yml with the following content:

```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 5  # Moderate rate for better traceability
  plugins:
    expect: {}

scenarios:
  - flow:
      - post:
          url: "/api/pokemon/pikachu"
          expect:
            - statusCode: 201
      - think: 5s
      - get:
          url: "/api/pokemon/pikachu"
          expect:
            - statusCode: 200
      - think: 5s
      - get:
          url: "/api/pokemon"
          expect:
            - statusCode: 200
      - think: 5s
      - delete:
          url: "/api/pokemon/pikachu"
          expect:
            - statusCode: 200
      - think: 5s
      - get:
          url: "/api/pokemon"
          expect:
            - statusCode: 200
```
3. Run the load test using npm:

```bash
npm run load-test
```
**Expected Output:**

Artillery will output a summary report at the end of the test, showing the number of requests, response times, and any failed expectations. Example output:

```text
All VUs finished. Total time: 1 minute, 22 seconds

--------------------------------
Summary report @ 15:49:38(-0600)
--------------------------------

http.codes.200: ....................................................... 818
http.codes.201: ....................................................... 300
http.codes.404: ....................................................... 382
http.codes.500: ....................................................... 300
http.requests: ........................................................ 1500
http.response_time:
  min: ................................................................ 0
  max: ................................................................ 372
  mean: ............................................................... 17
  median: ............................................................. 4
  p95: ................................................................ 111.1
  p99: ................................................................ 172.5
```

**Notes** 
* Ensure that your Pokémon API server has sufficient resources to handle the load generated by the tests.
* Modify the arrivalRate and duration in the load-test.yml file as needed to simulate different load scenarios.


### Project Structure
```arduino
pokemon-api/
├── node_modules/
├── routes/
│   └── pokemon.js
├── controllers/
│   └── pokemonController.js
├── models/
│   └── pokemon.js
├── .env.development
├── .env.test
├── .env.docker
├── app.js
├── Dockerfile
├── package.json
├── jest.setup.js
├── README.md
├── Pokedex API.postman_collection.json
├── test/
│   ├── pokemon.test.js
│   ├── sequentialTest.js
│   └── load-test.yml
```
### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgements
* PokeAPI
* Express
* Mongoose
* Jest
* Supertest 

## Refactorization
Throughout development I realized that my routes file was a close repeat to my Controllers file so I, in keeping with DRY methodology, simplified the routes file. Following are the before and after of that refactorization.

**Before Refactorization**
```js
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
```
**After Refactorization**
```js
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

router.get('/pokemons', getAllPokemon); 
router.get('/pokemon/:name', getPokemonByName);
router.delete('/pokemon/id/:id', deletePokemonById);
router.delete('/pokemon/name/:name', deletePokemonByName);
router.delete('/pokemon/type/:type', deletePokemonByType);

module.exports = router;
```