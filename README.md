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

### API Documentation
Fetch and Save Pokémon

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
├── app.js
├── package.json
├── jest.setup.js
├── README.md
└── test/
    └── pokemon.test.js
```
### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgements
* PokeAPI
* Express
* Mongoose
* Jest
* Supertest