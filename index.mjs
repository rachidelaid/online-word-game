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
  onConnect(socket, rooms, io);

  socket.on('disconnect', () => {
    onDisconnect(socket, rooms);
  });

  socket.on('changeLang', (lang) => {
    io.emit('updateLang', {
      lang,
      room: socket.handshake.auth.room,
    });
  });
});

const port = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log('listening on ' + port);
});
