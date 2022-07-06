<script>
  import { fade } from 'svelte/transition';
  let active = 'Create';

  const toggleActive = (e) => {
    active = e.target.textContent.trim();
  };
</script>

<div class="home">
  <div class="head" on:click={toggleActive}>
    <p class={active === 'Create' ? 'active' : ''}>Create</p>
    <p class={active === 'Join' ? 'active' : ''}>Join</p>
  </div>

  {#if active === 'Create'}
    <div class="create" in:fade>
      <h1>Create</h1>
      <p>Create a new game and invite your friends to join.</p>
      <input type="text" placeholder="Your Name" />
      <input type="text" placeholder="Room Id" />
      <button>Create</button>
    </div>
  {:else}
    <div class="join" in:fade>
      <h1>Join</h1>
      <p>Join a game that has been created.</p>
      <input type="text" placeholder="Your Name" />
      <input type="text" placeholder="Room Id" />
      <button>Join</button>
    </div>
  {/if}
</div>

<style>
  .home {
    width: 20rem;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .home .head {
    display: flex;
    justify-content: space-around;
  }

  .home .head p {
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  .home .head p:hover {
    color: var(--color-primary);
  }

  .home .head p.active {
    border-bottom: 2px solid var(--color-primary);
  }
</style>
