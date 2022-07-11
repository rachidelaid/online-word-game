<script>
  import Home from './views/Home.svelte';
  import Lobby from './views/Lobby.svelte';
  import Game from './views/Game.svelte';
  import Result from './views/Result.svelte';

  $: state = 'home';
  $: players = [];

  const setState = (event) => {
    state = event.detail.state;
    players = event.detail.players;
  };
</script>

<main>
  {#if state === 'home'}
    <Home on:changeState={setState} />
  {:else if state === 'lobby'}
    <Lobby {players} />
  {:else if state === 'game'}
    <Game />
  {:else if state === 'review'}
    <Game review={true} />
  {:else if state === 'result'}
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
