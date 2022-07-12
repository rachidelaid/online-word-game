import { writable } from "svelte/store";

const store = writable({
  players: [],
  lang: 'en',
  categories: [],
  state: 'home',
});

export default store;