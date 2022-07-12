<script>
  import socket from '../socket';
  import store from '../store';

  const isAdmin = () => {
    return $store.players.find(
      (p) => p.id === sessionStorage.getItem('playerId'),
    ).admin;
  };

  const updateCategories = () => {
    socket.emit('changeCategory', $store.categories);
  };

  const addCategory = () => {
    if (!isAdmin()) return;

    store.update((state) => {
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            title: '',
            value: '',
            checked: false,
          },
        ],
      };
    });
    updateCategories();
  };

  const updateCategory = (e, index) => {
    if (!isAdmin()) return;

    store.update((state) => {
      const cats = [...state.categories];
      cats[index].title = e.target.value;
      return {
        ...state,
        categories: cats,
      };
    });
    updateCategories();
  };

  const removeCategory = (index) => {
    if (!isAdmin()) return;

    store.update((state) => {
      const cats = [...state.categories].filter((_, i) => i !== index);
      return {
        ...state,
        categories: cats,
      };
    });
    updateCategories();
  };

  const updateLang = (e) => {
    if (isAdmin()) {
      const lang = e.target.value;
      store.update((state) => {
        return {
          ...state,
          lang,
        };
      });
      socket.emit('changeLang', lang);
    }
  };

  const startgame = () => {
    if (!isAdmin()) return;

    socket.emit('startGame');
  };
</script>

<div class="lobby">
  <h1>Lobby</h1>
  <div class="players">
    {#each $store.players as player}
      <p
        class={`${
          sessionStorage.getItem('playerId') === player.id ? 'current' : ''
        }`}
      >
        {`${player.admin ? '👑' : ''}`}
        {player.name}
      </p>
    {/each}
  </div>
  <select on:change={updateLang} value={$store.lang}>
    <option value="">Select a language</option>
    <option value="en">English</option>
    <option value="ar">Arabic</option>
  </select>
  <div class="categories">
    {#each $store.categories as category, i (i)}
      <div>
        <input
          placeholder={`category ${i + 1}`}
          type="text"
          value={category.title}
          on:change={(e) => updateCategory(e, i)}
          disabled={!isAdmin()}
        />
        {#if isAdmin()}
          <button on:click={() => removeCategory(i)} class="delete">X</button>
        {/if}
      </div>
    {/each}
  </div>
  {#if isAdmin()}
    <button on:click={addCategory}><span>+</span> Category</button>
    <button on:click={startgame}>Start</button>
  {/if}
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
