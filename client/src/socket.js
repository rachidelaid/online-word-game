import { io } from 'socket.io-client';
import store from './store';

const URL = 'http://localhost:5000';

const socket = io(URL, { autoConnect: false });

const reset = () => {
  store.update((state) => {
    return {
      ...state,
      state: 'home',
      players: [],
    };
  });
};

socket.on('room-exists', () => {
  reset();
});

socket.on('joined', (obj) => {
  store.update((state) => {
    if (obj.room === state.room) {
      return {
        ...state,
        state: 'lobby',
        players: obj.players,
      };
    }
  });
});

socket.on('updateLang', (obj) => {
  store.update((state) => {
    if (obj.room === state.room) {
      return {
        ...state,
        lang: obj.lang,
      };
    }
  });
});

socket.on('updateCategory', (obj) => {
  console.log(obj);
  store.update((state) => {
    if (obj.room === state.room) {
      return {
        ...state,
        categories: obj.categories,
      };
    }
  });
});

socket.on('room-empty', () => {
  reset();
});

export default socket;
