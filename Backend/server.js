import http from 'http';
import app from './app.js';
import { initSocket } from './socketIO.js';

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// initialize socket.io with the HTTP server
initSocket(server);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// This code creates an HTTP server using the Express application and listens on the specified port.

