# API de Pokémon (Documentación en Español)
## Resumen
Este proyecto es una aplicación de Node.js que interactúa con la PokeAPI para obtener, almacenar y gestionar datos de Pokémon en una base de datos MongoDB. La aplicación proporciona endpoints de API RESTful para realizar operaciones CRUD en los datos de Pokémon.

#### URL Base de la API en Vivo
La API en vivo está alojada en: https://pokedex-rt82.onrender.com

#### Características
* Obtener y guardar datos de Pokémon desde PokeAPI.
* Listar todos los Pokémon guardados.
* Eliminar Pokémon por ID o nombre.
* Eliminar Pokémon por tipo.

#### Características Adicionales
**Express Validator:**

Express-validator está integrado en la aplicación para asegurar que las solicitudes entrantes sean validadas y saneadas adecuadamente. Esto ayuda a prevenir vulnerabilidades comunes de seguridad, como la inyección de SQL y ataques XSS, asegurando que los datos procesados sean limpios y conformes a los formatos esperados.

**Limitación de Tasa (Rate Limiting):**

La limitación de tasa está implementada para proteger la aplicación del abuso y el uso excesivo. Limita el número de solicitudes que un cliente puede realizar en un cierto período, ayudando a prevenir ataques de denegación de servicio (DoS) y asegurando el uso justo de los recursos de la API.

## Patrón de Diseño

En este proyecto, hemos implementado el patrón de diseño de Capa de Servicio para mejorar la separación de responsabilidades y aumentar la mantenibilidad del código. El patrón de diseño de Capa de Servicio ayuda a organizar la lógica de negocio en una capa dedicada, que interactúa con los controladores. Este enfoque ofrece varios beneficios:

1. **Separación de Responsabilidades**: Al mover la lógica de negocio a la capa de servicio, nos aseguramos de que los controladores sean responsables únicamente de manejar las solicitudes y respuestas HTTP. Esta separación hace que el código sea más fácil de gestionar y entender.

2. **Reusabilidad**: La capa de servicio encapsula la lógica de negocio, haciéndola reutilizable en diferentes partes de la aplicación. Esto evita la duplicación de código y promueve los principios DRY (Don't Repeat Yourself, No Te Repitas).

3. **Testabilidad**: Aislar la lógica de negocio en la capa de servicio simplifica las pruebas unitarias. Podemos probar la lógica de negocio de forma independiente a los controladores, lo que lleva a pruebas más robustas y fiables.

4. **Mantenibilidad**: Con la clara separación de responsabilidades, se vuelve más fácil mantener y extender la aplicación. Cualquier cambio en la lógica de negocio se puede hacer en la capa de servicio sin afectar a los controladores.

### Implementación de Logger

Para mejorar las capacidades de registro y evitar el uso excesivo de `console.log`, hemos integrado la biblioteca de logger `winston`. La biblioteca `winston` proporciona un sistema de registro flexible y extensible, que nos permite registrar mensajes con diferentes niveles de severidad y enviarlos a varios transportes, como la consola y archivos. Esto ayuda a mejorar la monitorización y depuración de la aplicación.


#### Prerrequisitos
* Node.js
* MongoDB
#### Empezando
1. Clona el Repositorio
```sh
git clone https://github.com/ErikRobles/pokemon-api.git
cd pokemon-api
```
2. Instala las Dependencias
```sh
npm install
```
3. Configura las Variables de Entorno

Crea archivos .env.development, .env.test, .env.production  en el directorio raíz de tu proyecto.

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
MONGODB_URI=MONGODB_URI=mongodb+srv://<your_mongodb_username>:<your_mongodb_password>@reactcluster.mwilcq5.mongodb.net/?retryWrites=true&w=majority&appName=ReactCluster

POKEAPI_URL=https://pokeapi.co/api/v2/pokemon/
```
4. Inicia la Aplicación
```sh
npm start
or
npm run start:dev
```
En el desarrollo local, el servidor será puerta 3000

#### Ejecutando Pruebas
1. Ejecutar Pruebas

Para ejecutar las pruebas, usa el siguiente comando:
```sh
npm test
```
Esto ejecutará el conjunto de pruebas usando Jest.

### Documentación de la API
#### Colección de Postman
**Importando la Colección de Postman**

1. Descarga el Archivo de la Colección de Postman:
* Asegúrate de que el archivo Pokedex API.postman_collection.json esté presente en el directorio raíz del proyecto.
2. Abre Postman:
* Lanza la aplicación Postman.
3. Importa la Colección:
* Haz clic en el botón Importar en la esquina superior izquierda de la interfaz de Postman.
* Selecciona la pestaña Elegir Archivos.
* Navega al directorio del proyecto y selecciona el archivo Pokedex API.postman_collection.json.
* Haz clic en Abrir para importar la colección.
4. Usa los Endpoints:
* Una vez importada la colección, verás una lista de todos los endpoints en la colección.
* Ahora puedes enviar solicitudes a los endpoints de la API usando Postman.

**Obtener y Guardar Pokémon**

**Endpoint:** POST /api/pokemon/:name

**Descripción:** Obtiene los datos de un Pokémon dado por su nombre desde la PokeAPI y los guarda en la base de datos MongoDB.

**Parámetros:**

* name: El nombre del Pokémon.
Ejemplo de Solicitud:

```sh
POST https://pokedex-rt82.onrender.com/api/pokemon/pikachu
```
Ejemplo de Respuesta:

```json
{
  "id": 25,
  "name": "pikachu",
  "moves": ["mega-punch", "pay-day", "thunder-punch", "slam"],
  "types": ["electric"]
}
```
Listar Todos los Pokémon Guardados

**Endpoint:** GET /api/pokemons

**Descripción:** Lista todas las entradas de Pokémon guardadas en la base de datos MongoDB.

Ejemplo de Solicitud:

```sh
GET https://pokedex-rt82.onrender.com/api/pokemons
```
Ejemplo de Respuesta:

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
### Eliminar Pokémon por ID
**Endpoint:** DELETE /api/pokemon/id/

**Descripción:** Elimina una entrada de Pokémon de la base de datos MongoDB por su ID.

**Parámetros:**

* id: El ID del Pokémon.

**Ejemplo de Solicitud:**

```sh
DELETE https://pokedex-rt82.onrender.com/api/pokemon/id/25
```
Ejemplo de Respuesta:

```json
{
  "message": "Pokémon eliminado exitosamente"
}
```
#### Eliminar Pokémon por Nombre
**Endpoint:** DELETE /api/pokemon/name/

**Descripción:** Elimina una entrada de Pokémon de la base de datos MongoDB por su nombre.

**Parámetros:**

* name: El nombre del Pokémon.
Ejemplo de Solicitud:

```sh
DELETE https://pokedex-rt82.onrender.com/api/pokemon/name/pikachu
```
Ejemplo de Respuesta:

```json
{
  "message": "Pokémon eliminado exitosamente"
}
```
#### Eliminar Pokémon por Tipo
**Endpoint:** DELETE /api/pokemon/type/

**Descripción:** Elimina todas las entradas de Pokémon de la base de datos MongoDB que tienen un tipo especificado.

**Parámetros:**

* type: El tipo del Pokémon.
**Ejemplo de Solicitud:**
```sh
DELETE https://pokedex-rt82.onrender.com/api/pokemon/type/bug
```
Ejemplo de Respuesta:

```json
{
  "message": "Pokémon eliminado exitosamente"
}
```
## Configuración de Docker
#### Prerrequisitos
* Docker instalado en tu máquina local
1. Crea un Archivo .env.docker

Crea un archivo llamado .env.docker en el directorio raíz de tu proyecto con el siguiente contenido:

```env
PORT=3000
MONGODB_URI=<tu_mongodb_uri>
POKEAPI_URL=https://pokeapi.co/api/v2/pokemon/
```
Reemplaza '<tu_mongodb_uri>' con tu URI real de MongoDB

2. Construye la Imagen de Docker

Ejecuta el siguiente comando en el directorio raíz de tu proyecto para construir la imagen de Docker:

```sh
sudo docker build -t pokemon-api .
```
3. Ejecuta el Contenedor de Docker

Ejecuta el siguiente comando para iniciar un contenedor desde la imagen, mapeándolo a un puerto disponible (por ejemplo, 3001 si el 3000 está en uso):

```sh
sudo docker run -p 3001:3000 -d pokemon-api
```
4. Verifica el Contenedor de Docker

* Lista los Contenedores en Ejecución:
```sh
sudo docker ps
```
* Accede a la Aplicación:
Abre tu navegador y ve a http://localhost:3001 para verificar que la aplicación esté en funcionamiento.

* Verifica los Logs (si es necesario):
Si necesitas verificar los logs por algún problema, usa:

```sh
sudo docker logs <container_id>
```
* Detén el Contenedor:

Si necesitas detener el contenedor, usa:
```sh
sudo docker stop <container_id>
```
**Notas**

* Si encuentras problemas de permisos al ejecutar comandos de Docker, prefija los comandos con sudo.
* Asegúrate de que la URI de MongoDB en .env.docker esté correctamente configurada y sea accesible desde el contenedor de Docker.
### Ejecutando las Pruebas
Esta sección proporciona instrucciones sobre cómo ejecutar tanto la prueba secuencial como la prueba de carga para la API de Pokémon.

#### Prueba Secuencial
El script de prueba secuencial prueba la funcionalidad básica de crear, recuperar, listar y eliminar un Pokémon secuencialmente. Este script asegura que la funcionalidad principal funcione según lo esperado sin condiciones de carrera.

**Prerrequisitos**

* Asegúrate de que el servidor de la API de Pokémon esté ejecutándose localmente en el puerto 3000.
* Node.js debe estar instalado en tu máquina.

**Pasos**

1. Navega al directorio del proyecto:
```bash
cd /path/to/your/project
```

2. Ejecuta la prueba secuencial:
```bash
node test/sequentialTest.js
```
**Salida Esperada:**

El script generará logs para cada iteración, indicando el éxito o fallo de crear, recuperar, listar y eliminar Pokémon. Ejemplo de salida:

```text
Iteration: 1
Successfully created Pokémon: pikachu
Successfully retrieved Pokémon by name: pikachu
Successfully listed all Pokémon: 15 found
Successfully deleted Pokémon by name: Pokémon deleted successfully
...
Sequential test completed.
```
#### Prueba de Carga
El script de prueba de carga prueba el rendimiento y la estabilidad de la API de Pokémon bajo carga. Este script simula múltiples usuarios realizando varias operaciones en la API.

**Prerrequisitos**

* Asegúrate de que el servidor de la API de Pokémon esté ejecutándose localmente en el puerto 3000.

* Artillery debe estar instalado globalmente. Si no, instálalo usando el siguiente comando:

```bash
npm install -g artillery
```
**Pasos**

1. Navega al directorio del proyecto:
```bash
cd /path/to/your/project
```
2. Ejecuta la prueba de carga:

Asegúrate de tener la siguiente configuración en tu package.json:

```json
{
  "scripts": {
    "load-test": "artillery run test/load-test.yml"
  }
}
```
Crea un archivo llamado load-test.yml con el siguiente contenido:

```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 5  # Tasa moderada para mejor trazabilidad
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
3. Ejecuta la prueba de carga usando npm:
```bash
npm run load-test
```
**Salida Esperada:**

Artillery generará un informe de resumen al final de la prueba, mostrando el número de solicitudes, tiempos de respuesta y cualquier expectativa fallida. Ejemplo de salida:

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
**Notas**

* Asegúrate de que tu servidor de la API de Pokémon tenga suficientes recursos para manejar la carga generada por las pruebas.
* Modifica la tasa de llegada y la duración en el archivo load-test.yml según sea necesario para simular diferentes escenarios de carga.
#### Estructura del Proyecto
```arduino
Copy code
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
#### Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

#### Agradecimientos
* PokeAPI
* Express
* Mongoose
* Jest
* Supertest

## Refactorización
Durante el desarrollo, me di cuenta de que mi archivo de rutas era una repetición cercana a mi archivo de controladores, así que, siguiendo la metodología DRY, simplifiqué el archivo de rutas. A continuación se presentan las versiones antes y después de la refactorización.

**Antes de la Refactorización**
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
**Despues de la Refactorización**
```js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const {
    fetchAndSavePokemon,
    getAllPokemon,
    getPokemonByName,
    deletePokemonById,
    deletePokemonByName,
    deletePokemonByType
} = require('../controllers/pokemonController');

router.post('/pokemon/:name', [
    check('name').isString().trim().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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

```

# Pokemon API (English Documentation)

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

## Design Pattern 
In this project, we have implemented the Service Layer design pattern to improve the separation of concerns and enhance the maintainability of the codebase. The Service Layer design pattern helps in organizing the business logic in a dedicated layer, which interacts with the controllers. This approach offers several benefits:

1. **Separation of Concerns**: By moving the business logic to the service layer, we ensure that controllers are only responsible for handling HTTP requests and responses. This separation makes the code easier to manage and understand.

2. **Reusability**: The service layer encapsulates the business logic, making it reusable across different parts of the application. This avoids code duplication and promotes DRY (Don't Repeat Yourself) principles.

3. **Testability**: Isolating the business logic in the service layer simplifies unit testing. We can test the business logic independently from the controllers, leading to more robust and reliable tests.

4. **Maintainability**: With the clear separation of responsibilities, it becomes easier to maintain and extend the application. Any changes to the business logic can be made in the service layer without affecting the controllers.

### Logger Implementation

To enhance the logging capabilities and avoid the excessive use of `console.log`, we have integrated the `winston` logger library. The `winston` library provides a flexible and extensible logging system, which allows us to log messages with different levels of severity and output them to various transports, such as console and files. This helps in better monitoring and debugging of the application.


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