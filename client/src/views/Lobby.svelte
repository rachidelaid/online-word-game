<script>
  let players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

  $: categories = [];

  const addCategory = () => {
    categories = [...categories, ''];
  };

  const updateCategory = (e, index) => {
    categories[index] = e.target.value;
    console.log(categories);
  };

  const removeCategory = (index) => {
    categories = categories.filter((_, i) => i !== index);
  };
</script>

<div class="lobby">
  <h1>Lobby</h1>
  <div class="players">
    {#each players as player}
      <p>{player}</p>
    {/each}
  </div>
  <div class="categories">
    {#each categories as category, i (i)}
      <div>
        <input
          placeholder={`category ${i + 1}`}
          type="text"
          on:change={(e) => updateCategory(e, i)}
        />
        <button on:click={() => removeCategory(i)} class="delete">X</button>
      </div>
    {/each}
  </div>
  <button on:click={addCategory}><span>+</span> Category</button>
  <button>Start</button>
</div>

<style>
  .lobby {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .players {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    gap: 1rem;
  }

  .players p {
    background-color: var(--color-info);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: #fff;
    min-width: fit-content;
  }

  .categories {
    width: 26rem;
  }

  .categories > div {
    display: flex;
    align-items: center;
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  span {
    font-size: 1.5rem;
    font-weight: bold;
  }

  button:last-child {
    width: 10rem;
    background-color: var(--color-success);
    justify-content: center;
    margin-top: 1rem;
  }

  button.delete {
    background-color: var(--color-danger);
    border-radius: 0.5rem;
    color: #fff;
    cursor: pointer;
    width: fit-content;
    margin: 0 0 0.5rem 0.5rem;
  }
</style>
