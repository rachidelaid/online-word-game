<script>
  import { fade } from 'svelte/transition';
  import socket from '../socket';
  let active = 'Create';

  const toggleActive = (e) => {
    if (e.target.nodeName === 'P') {
      active = e.target.textContent.trim();
    }
  };

  const connect = (e) => {
    e.preventDefault();
    socket.auth = {
      name: e.target.elements.username.value.trim(),
      room: e.target.elements.roomId.value.trim(),
      status: active,
    };
    socket.connect();

    socket.on('room-exists', (msg) => {
      console.log(msg);
    });
  };
</script>

<div class="home">
  <div class="head" on:click={toggleActive}>
    <p class={active === 'Create' ? 'active' : ''}>Create</p>
    <p class={active === 'Join' ? 'active' : ''}>Join</p>
  </div>

  {#if active === 'Create'}
    <form on:submit={connect} class="create" in:fade>
      <h1>Create</h1>
      <p>Create a new game and invite your friends to join.</p>
      <input type="text" placeholder="Your Name" id="username" required />
      <input type="text" placeholder="Room Id" id="roomId" required />
      <button type="submit">Create</button>
    </form>
  {:else}
    <form on:submit={connect} class="join" in:fade>
      <h1>Join</h1>
      <p>Join a game that has been created.</p>
      <input type="text" placeholder="Your Name" id="username" required />
      <input type="text" placeholder="Room Id" id="roomId" required />
      <button type="submit">Join</button>
    </form>
  {/if}
</div>

<style>
  .home {
    width: min(20rem, 90%);
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .head {
    display: flex;
    justify-content: space-around;
  }

  .head p {
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  .head p:hover {
    color: var(--color-primary);
  }

  .head p.active {
    border-bottom: 2px solid var(--color-primary);
  }

  .join,
  .create {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
</style>
