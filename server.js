const app = require('./app');
// switch from app running server to server.js due to server not closing properly for testing.

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
