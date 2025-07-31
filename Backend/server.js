<<<<<<< HEAD
import http from 'http';
import app from './app.js';

const port = process.env.PORT || 3000;
const server = http.createServer(app);
=======
const http= require('http');
const app= require('./app');

const port= process.env.PORT || 3000;
const server=http.createServer(app);
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// This code creates an HTTP server using the Express application and listens on the specified port.

