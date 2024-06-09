const axios = require('axios');

const runSequentialTest = async () => {
    for (let i = 1; i <= 10; i++) {
        try {
            console.log(`Iteration: ${i}`);

            // Create Pokémon
            const createResponse = await axios.post('http://localhost:3000/api/pokemon/pikachu');
            console.log(`Successfully created Pokémon: ${createResponse.data.name}`);

            // Retrieve Pokémon by name
            const getByNameResponse = await axios.get('http://localhost:3000/api/pokemon/pikachu');
            console.log(`Successfully retrieved Pokémon by name: ${getByNameResponse.data.name}`);

            // List all Pokémon
            const listResponse = await axios.get('http://localhost:3000/api/pokemon');
            console.log(`Successfully listed all Pokémon: ${listResponse.data.length} found`);

            // Delete Pokémon by name
            const deleteByNameResponse = await axios.delete('http://localhost:3000/api/pokemon/pikachu');
            console.log(`Successfully deleted Pokémon by name: ${deleteByNameResponse.data.message}`);

            // Wait for a short period before the next iteration to avoid race conditions
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Error in iteration ${i}: ${error.message}`);
        }
    }

    console.log('Sequential test completed.');
};

runSequentialTest();
