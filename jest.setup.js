// jest.setup.js
require('dotenv').config({ path: '.env.test' });

console.log(`Running tests with MONGODB_URI: ${process.env.MONGODB_URI}`);


