import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { onConnect, onDisconnect, start, done, reviewDone } from './io.js';

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
    const room = rooms.find((r) => r.id === socket.handshake.auth.room);
    room.lang = lang;
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
    start(io, socket, rooms);
  });

  socket.on('done', (array) => {
    done(io, socket, rooms, array);
  });

  socket.on('reviewDone', (obj) => {
    reviewDone(io, socket, rooms, obj);
  })

  socket.on('playAgain', () => {
    const room = rooms.find((r) => r.id === socket.handshake.auth.room);

    room.players.forEach((p) => {
      p.done = false;
      delete p.answers;
      delete p.reviewerIndex;
    });

    io.emit('playAgain', {
      room: socket.handshake.auth.room,
      players: room.players,
    });
  });
});

const port = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log('listening on ' + port);
});
