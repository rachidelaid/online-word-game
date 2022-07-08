import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { onConnect } from './io.js';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const rooms = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
  onConnect(socket, rooms);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log('listening on ' + port);
});
