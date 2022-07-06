<script>
  export let review = false;
  import Progress from '../components/Progress.svelte';

  let categories = [
    {
      title: 'Animals',
      value: '',
      checked: false,
    },
    {
      title: 'Food',
      value: '',
      checked: false,
    },
    {
      title: 'Sports',
      value: '',
      checked: false,
    },
    {
      title: 'Music',
      value: '',
      checked: false,
    },
    {
      title: 'Movies',
      value: '',
      checked: false,
    },
  ];

  const setValue = (e, index) => {
    categories = categories.map((c, i) => {
      if (i === index) {
        c.value = e.target.value.trim();
      }
      return c;
    });

    console.log(categories);
  };
</script>

<div class="game">
  <h1>Game</h1>
  {#if !review}
    <div class="progress">
      <Progress
        count={categories.filter((c) => c.value).length / categories.length}
      />
    </div>
  {/if}
  <div class="categories">
    {#each categories as category, i (i)}
      <label for={category.title}>
        {category.title}
        {#if review}
          <div>
            <input
              type="text"
              id={category.title}
              on:change={(e) => setValue(e, i)}
            />
            {#if category.checked}
              <button
                class="uncheck"
                on:click={() => (category.checked = false)}>⍻</button
              >
            {:else}
              <button on:click={() => (category.checked = true)}>✓</button>
            {/if}
          </div>
        {:else}
          <input
            type="text"
            id={category.title}
            on:change={(e) => setValue(e, i)}
          />
        {/if}
      </label>
    {/each}
  </div>
  <button>Done</button>
</div>

<style>
  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
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
