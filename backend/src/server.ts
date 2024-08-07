import http from 'http';
import dotenv from 'dotenv';
import { createServer } from 'http';
import app from './app';
import { initSocket } from './socket';

dotenv.config();

const PORT = Number(process.env.PORT || 4000);

const server: http.Server = createServer(app);

// initialize socket.io and attach to server
initSocket(server);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});