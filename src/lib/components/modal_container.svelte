<!-- Modal.svelte -->
<script>
  export let isOpen = false;
  export let closeModal;

  function handleClickOutside(event) {
    if (event.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  }
</script>

{#if isOpen}
  <div class="modal-overlay" on:click={handleClickOutside}>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
