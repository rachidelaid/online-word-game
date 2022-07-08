import { v4 as uuidv4 } from 'uuid';
import Room from './room.js';

export const onConnect = (socket, rooms) => {
  if (socket.handshake.auth.status === 'Create') {
    if (!rooms.length) {
      const room = new Room(socket.handshake.auth.room);
      room.addPlayer({
        id: uuidv4(),
        name: socket.handshake.auth.name,
      });

      rooms.push(room);
      socket.join(socket.handshake.auth.room);
    } else if (rooms.some((r) => r.id === socket.handshake.auth.room)) {
      socket.emit('room-exists', {
        msg: "room already exists",
        room: socket.handshake.auth.room,
      });
    }
  } else if (socket.handshake.auth.status === 'Join') {
    const room = rooms.find((r) => r.id === socket.handshake.auth.room);
    if (room) {
      room.addPlayer({
        id: socket.handshake.auth.id,
        name: socket.handshake.auth.name,
      });

      socket.join(socket.handshake.auth.room);
    } else {
      socket.emit('room-does-not-exist', {
        msg: "room does not exist",
        room: socket.handshake.auth.room,
      });
    }
  }
}

export const onDisconnect = (socket, rooms) => {
  const room = rooms.find((r) => r.id === socket.handshake.auth.room);
  if (room) {
    room.removePlayer(socket.handshake.auth.id);
  }

  if (room.isEmpty()) {
    socket.to(room.name).emit('room-empty', {
      msg: "room is empty",
      room: room.name,
    });
    rooms.splice(rooms.indexOf(room), 1);
  }
}