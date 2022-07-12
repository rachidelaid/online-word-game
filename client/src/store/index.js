import { writable } from "svelte/store";

const store = writable({
  players: [],
  lang: 'en',
  categories: [],
  state: 'home',
  room: null
});

export default store;