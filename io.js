import Room from './room.js';

const emitJoined = (socket, room) => {
  socket.to(room.id).emit('joined', {
    msg: 'joined successfully',
    room: room.id,
    players: room.players,
  });
};

const createRoom = (socket, rooms) => {
  if (!rooms.length) {
    const room = new Room(socket.handshake.auth.room);
    room.addPlayer({
      id: socket.handshake.auth.id,
      name: socket.handshake.auth.name,
      admin: true,
    });

    rooms.push(room);
    socket.join(socket.handshake.auth.room);
    emitJoined(socket, room);
  } else if (rooms.some((r) => r.id === socket.handshake.auth.room)) {
    socket.emit('room-exists', {
      msg: 'room already exists',
      room: socket.handshake.auth.room,
    });
  }
};

const joinRoom = (socket, rooms) => {
  const room = rooms.find((r) => r.id === socket.handshake.auth.room);
  if (room) {
    room.addPlayer({
      id: socket.handshake.auth.id,
      name: socket.handshake.auth.name,
    });

    socket.join(socket.handshake.auth.room);
    emitJoined(socket, room);
  } else {
    socket.emit('room-does-not-exist', {
      msg: 'room does not exist',
      room: socket.handshake.auth.room,
    });
  }
};

export const onConnect = (socket, rooms) => {
  if (socket.handshake.auth.status === 'Create') {
    createRoom(socket, rooms);
  } else if (socket.handshake.auth.status === 'Join') {
    joinRoom(socket, rooms);
  }
};

export const onDisconnect = (socket, rooms) => {
  const room = rooms.find((r) => r.id === socket.handshake.auth.room);

  if (room && room.isEmpty()) {
    socket.to(socket.handshake.auth.room).emit('room-empty', {
      msg: 'room is empty',
      room: socket.handshake.auth.room,
    });
    rooms.splice(rooms.indexOf(room), 1);
  } else if (room) {
    if (room.players.find((p) => p.id === socket.handshake.auth.id).admin) {
      room.removePlayer(socket.handshake.auth.id);
      room.players[0].admin = true;
    }
    room.removePlayer(socket.handshake.auth.id);

    emitJoined(socket, room);
  }
};
