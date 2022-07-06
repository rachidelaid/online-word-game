import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import Room from './room.js';
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const rooms = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
  if (socket.handshake.auth.status === "Create") {
    if (!rooms.length) {
      const room = new Room(socket.handshake.auth.room);
      room.addPlayer({
        id: uuidv4(),
        name: socket.handshake.auth.name
      });

      rooms.push(room);
    } else if (rooms.some(r => r.id === socket.handshake.auth.room)) {
      socket.emit('room-exists', {
        room: socket.handshake.auth.room
      });
    }
  } else if (socket.handshake.auth.status === "Join") {
    const room = rooms.find(r => r.id === socket.handshake.auth.room);
    if (room) {

      room.addPlayer({
        id: socket.handshake.auth.id,
        name: socket.handshake.auth.name
      });

    } else {
      socket.emit('room-does-not-exist', {
        room: socket.handshake.auth.room
      });
    }
  }

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log('listening on ' + port);
});