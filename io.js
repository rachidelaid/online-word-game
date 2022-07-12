import Room from './room.js';
let globalIo;

const emitJoined = (room) => {
  if (!globalIo) return;

  globalIo.emit('joined', {
    msg: 'joined successfully',
    room: room.id,
    players: room.players,
  });
};

const createRoom = (socket, rooms) => {
  if (
    !rooms.length ||
    !rooms.some((r) => r.id === socket.handshake.auth.room)
  ) {
    const room = new Room(socket.handshake.auth.room);
    room.addPlayer({
      id: socket.handshake.auth.id,
      name: socket.handshake.auth.name,
      admin: true,
      done: false,
    });

    rooms.push(room);
    socket.join(socket.handshake.auth.room);

    emitJoined(room);
  } else {
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
      done: false,
    });

    socket.join(socket.handshake.auth.room);

    emitJoined(room);
  } else {
    socket.emit('room-does-not-exist', {
      msg: 'room does not exist',
      room: socket.handshake.auth.room,
    });
  }
};

export const onConnect = (socket, rooms, io) => {
  globalIo = io;
  if (socket.handshake.auth.status === 'Create') {
    createRoom(socket, rooms);
  } else if (socket.handshake.auth.status === 'Join') {
    joinRoom(socket, rooms);
  }
};

export const onDisconnect = (socket, rooms) => {
  const room = rooms.find((r) => r.id === socket.handshake.auth.room);
  if (!room) return;

  if (room.isEmpty()) {
    globalIo.emit('room-empty', {
      msg: 'room is empty',
      room: socket.handshake.auth.room,
    });
    rooms.splice(rooms.indexOf(room), 1);
  } else {
    if (room.players.find((p) => p.id === socket.handshake.auth.id).admin) {
      room.removePlayer(socket.handshake.auth.id);
      room.players[0].admin = true;
    }
    room.removePlayer(socket.handshake.auth.id);

    emitJoined(room);
  }
};

export const start = (io, socket) => {
  io.emit('launchGame', {
    room: socket.handshake.auth.room,
  });
};

export const done = (io, socket, rooms, array) => {
  const room = rooms.find((r) => r.id === socket.handshake.auth.room);
  if (!room) return;

  room.players.forEach((p, i) => {
    if (p.id === socket.handshake.auth.id) {
      p.answers = array;
      p.done = true;
      p.reviewerIndex = i + 1 >= room.players.length ? 0 : i + 1;
    }
  });

  if (room.isEveryoneDone()) {
    io.emit('gameOver', {
      room: socket.handshake.auth.room,
      players: room.players,
    });

    room.players.forEach((p) => {
      p.done = false;
    });
  }
};

export const reviewDone = (io, socket, rooms, obj) => {
  const room = rooms.find((r) => r.id === socket.handshake.auth.room);
  if (!room) return;

  room.players.forEach((p, i) => {
    if (p.id === socket.handshake.auth.id) {
      p.done = true;
    }
  });

  room.players[obj.index].answers = obj.answers;

  if (room.isEveryoneDone()) {
    io.emit('playersResult', {
      room: socket.handshake.auth.room,
      players: room.players,
    });

    room.players.forEach((p) => {
      p.done = false;
    });
  }
};
