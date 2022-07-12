<script>
  import store from '../store';
  import socket from '../socket';

  $: clicked = false;

  const getScore = (player) => {
    const valid = player.answers.filter((p) => p.checked).length;

    return Math.floor((valid / player.answers.length) * 100);
  };

  const playAgain = () => {
    socket.emit('playAgain');
  };
</script>

<div class="result">
  <h1>Result</h1>
  <div class="players">
    {#each $store.players as player, i (i)}
      <div class="player">
        <h2>{player.name}</h2>
        <p class="score-value">{getScore(player)}%</p>
      </div>
    {/each}
  </div>
  {#if !clicked}
    <button on:click={playAgain}>Play Again</button>
  {/if}
</div>

<style>
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 2rem;
  }

  .player {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 1rem;
  }
</style>
