<script>
  import socket from '../socket';
  export let players = [];

  socket.on('playersUpdate', (obj) => {
    players = obj.players;
  });

  let lang = '';
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

  const updateLang = (e) => {
    lang = e.target.value;
    console.log(lang);
  };
</script>

<div class="lobby">
  <h1>Lobby</h1>
  <div class="players">
    {#each players as player}
      <p
        class={`${
          localStorage.getItem('playerName') === player.name ? 'current' : ''
        }`}
      >
        {`${player.admin ? '👑' : ''}`}
        {player.name}
      </p>
    {/each}
  </div>
  <select on:change={updateLang}>
    <option value="">Select a language</option>
    <option value="en">English</option>
    <option value="ar">Arabic</option>
  </select>
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
    opacity: 0.7;
  }

  .players p.current {
    opacity: 1;
  }

  select {
    width: min(26rem, 100%);
  }

  .categories {
    width: min(26rem, 100%);
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
