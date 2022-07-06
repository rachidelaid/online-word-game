<script>
  import Progress from '../components/Progress.svelte';

  let categories = [
    {
      title: 'Animals',
      value: '',
    },
    {
      title: 'Food',
      value: '',
    },
    {
      title: 'Sports',
      value: '',
    },
    {
      title: 'Music',
      value: '',
    },
    {
      title: 'Movies',
      value: '',
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
  <div class="progress">
    <Progress
      count={categories.filter((c) => c.value).length / categories.length}
    />
  </div>
  <div class="categories">
    {#each categories as category, i (i)}
      <label for={category.title}>
        {category.title}
        <input
          type="text"
          id={category.title}
          on:change={(e) => setValue(e, i)}
        />
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
    padding: 2rem;
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

  button {
    background-color: var(--color-success);
  }
</style>
