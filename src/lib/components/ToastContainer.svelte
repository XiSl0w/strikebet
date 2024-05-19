<script>
    import { toasts } from '$lib/store/toastStore.js';
    import Toast from '$lib/components/Toast.svelte';
  </script>
  
  <style>
    .toast-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      z-index: 1000;
      gap: 10px;
    }
  </style>
  
  <div class="toast-container">
    {#each $toasts as { id, type, text } (id)}
      <Toast {id} {type} {text} key={id} />
    {/each}
  </div>
  