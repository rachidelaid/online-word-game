import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { onConnect, onDisconnect, start, done } from './io.js';

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

  socket.on('changeCategory', (categories) => {
    io.emit('updateCategory', {
      categories,
      room: socket.handshake.auth.room,
    });
  });

  socket.on('startGame', () => {
    console.log('start game');
    start(io, socket);
  });

  socket.on('done', (array) => {
    done(io, socket, rooms, array);
  })
});

const port = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log('listening on ' + port);
});
