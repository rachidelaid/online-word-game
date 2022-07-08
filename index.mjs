import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { onConnect, onDisconnect } from './io.js';

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
    onDisconnect(socket, rooms);
  });

  socket.on('getPlayers', (roomName) => {
    const room = rooms.find((r) => r.name === roomName);
    if (room) {
      socket.emit('players', {
        players: room.players,
      });
    }
  })
});

const port = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log('listening on ' + port);
});
