<script>
  import Home from './views/Home.svelte';
  import Lobby from './views/Lobby.svelte';
  import Game from './views/Game.svelte';
  import Result from './views/Result.svelte';
  import store from './store';
</script>

<main>
  {#if $store.state === 'home'}
    <Home />
  {:else if $store.state === 'lobby'}
    <Lobby />
  {:else if $store.state === 'game'}
    <Game />
  {:else if $store.state === 'review'}
    <Game review={true} />
  {:else if $store.state === 'result'}
    <Result />
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    --color-primary: #0070f3;
    --color-secondary: #3593ff;
    --color-success: #00b300;
    --color-danger: #ff0000;
    --color-warning: #ff9100;
    --color-info: #474747;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
</style>
