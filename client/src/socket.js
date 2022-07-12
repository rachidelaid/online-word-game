import { io } from "socket.io-client";
import store from "./store";


const URL = "http://localhost:5000";

const socket = io(URL, { autoConnect: false })

socket.on('room-exists', (msg) => {
  console.log(msg);
});

socket.on('joined', (obj) => {
  console.log(obj);
  // dispatch('changeState', {
  //   state: 'lobby',
  //   players: obj.players,
  // });

  store.update((state) => {
    return {
      ...state,
      state: 'lobby',
      players: obj.players,
    };
  });
});

socket.on('room-empty', () => {
  console.log('room-empty');
  // dispatch('changeState', {
  //   state: 'home',
  //   players: [],
  // });

  store.update((state) => {
    return {
      ...state,
      state: 'home',
      players: [],
    };
  });
});

export default socket;