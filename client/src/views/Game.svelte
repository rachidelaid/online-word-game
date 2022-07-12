<script>
  import { onMount } from 'svelte';

  import store from '../store';
  import socket from '../socket';
  export let review = false;
  import Progress from '../components/Progress.svelte';

  $: sent = false;
  $: answers = [];

  const setValue = (e, index) => {
    store.update((state) => {
      const cats = [...state.categories];
      cats[index].value = e.target.value.trim();
      return {
        ...state,
        categories: cats,
      };
    });
  };

  const done = () => {
    sent = true;

    if (review) {
      socket.emit('reviewDone', {
        index: $store.players.find(
          (p) => p.id === sessionStorage.getItem('playerId'),
        ).reviewerIndex,
        answers: answers,
      });
      return;
    }

    socket.emit('done', $store.categories);
  };

  onMount(() => {
    if (!review) return;

    const index = $store.players.find(
      (p) => p.id === sessionStorage.getItem('playerId'),
    ).reviewerIndex;

    answers = [...$store.players[index].answers];
  });
</script>

<div class="game">
  <h1>Game</h1>
  <p>current character: <b>{$store.character}</b></p>
  {#if !review}
    <div class="progress">
      <Progress
        count={$store.categories.filter((c) => c.value).length /
          $store.categories.length}
      />
    </div>
  {/if}
  <div class="categories">
    {#if !review}
      {#each $store.categories as category, i (i)}
        <label for={category.title}>
          {category.title}
          <input
            type="text"
            id={category.title}
            on:change={(e) => setValue(e, i)}
          />
        </label>
      {/each}
    {:else}
      {#each answers as category}
        <label for={category.title}>
          {category.title}
          <div>
            <input type="text" value={category.value} />
            {#if category.checked}
              <button
                class="uncheck"
                on:click={() => (category.checked = false)}>⍻</button
              >
            {:else}
              <button on:click={() => (category.checked = true)}>✓</button>
            {/if}
          </div>
        </label>
      {/each}
    {/if}
  </div>
  {#if !sent}
    <button on:click={done}>Done</button>
  {/if}
</div>

<style>
  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .game b {
    font-size: 2rem;
  }

  .categories {
    width: min(26rem, 100%);
  }

  .progress {
    position: fixed;
    top: -2rem;
    right: -2rem;
    background-color: #fff;
    border-radius: 50%;
    transform: scale(0.5);
  }

  label > div {
    display: flex;
    align-items: centers;
  }

  label > div button {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0 0.5rem 0.5rem;
  }

  label > div button.uncheck {
    background-color: var(--color-info);
  }

  button {
    background-color: var(--color-success);
  }
</style>
