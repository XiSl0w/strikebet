<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { removeToast } from '$lib/store/toastStore.js';
  
    export let id;
    export let type = 'info'; // default type
    export let text = '';
  
    onMount(() => {
      const timer = setTimeout(() => {
        removeToast(id);
      }, 5000);
  
      return () => clearTimeout(timer);
    });
  </script>
  
  <style>
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      opacity: 0.95;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      max-width: 300px;
      z-index: 1000;
      animation: slideIn 0.5s, fadeOut 0.5s 4.5s;
    }
  
    .success {
      background-color: #4CAF50;
    }
  
    .error {
      background-color: #f44336;
    }
  
    .info {
      background-color: #2196F3;
    }
  
    .warning {
      background-color: #ff9800;
    }
  
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 0.95;
      }
    }
  
    @keyframes fadeOut {
      from {
        opacity: 0.95;
      }
      to {
        opacity: 0;
      }
    }
  </style>
  
  <div class="toast {type}" transition:fly={{ x: 100, duration: 300 }}>
    {#if type === 'success'}
      <i class="fa-solid fa-check-circle"></i>
    {:else if type === 'error'}
      <i class="fa-solid fa-times-circle"></i>
    {:else if type === 'info'}
      <i class="fa-solid fa-info-circle"></i>
    {:else if type === 'warning'}
      <i class="fa-solid fa-exclamation-circle"></i>
    {/if}
    <span>{text}</span>
  </div>
  