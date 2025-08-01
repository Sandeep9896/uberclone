import http from 'http';
import app from './app.js';

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// This code creates an HTTP server using the Express application and listens on the specified port.

