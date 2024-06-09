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