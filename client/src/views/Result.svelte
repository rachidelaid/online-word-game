<script>
  let players = [
    {
      name: 'Player 1',
      score: 0,
    },
    {
      name: 'Player 2',
      score: 0,
    },
  ];
</script>

<div class="result">
  <h1>Result</h1>
  <div class="players">
    {#each players as player, i (i)}
      <div class="player">
        <h2>{player.name}</h2>
        <p class="score-value">{player.score}%</p>
      </div>
    {/each}
  </div>

  <button>Play Again</button>
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
