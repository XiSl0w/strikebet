<script>
  import { onDestroy } from 'svelte';
  import { store as cart, actions } from '$lib/store/cart.js';
  
  let cartItems;

  const unsubscribe = cart.subscribe(value => {
    cartItems = value.items;
  });

  onDestroy(unsubscribe);

  function handlePlacedAmountChange(itemId, event) {
    const amount = event.target.value;
    if (amount === '') {
      actions.updatePlacedAmount(itemId, 0);
      return;
    }
    if (isNaN(amount)) {
      return;
    }
    actions.updatePlacedAmount(itemId, parseFloat(amount));
  }
</script>

<div class="placed">
  {#each cartItems as item}
    <div class="placed-row">
      <p>
        {item.match.team1} to {item.match.action}<br />
        <span>Against {item.match.team2}</span> <b>{item.match.league}</b>
      </p>
      <h3>{item.odd}</h3>
      <input 
        type="text" 
        placeholder="Bet value" 
        value={item.placed_amount} 
        on:input={(event) => handlePlacedAmountChange(item.id, event)} 
      />
    </div>
  {/each}

  <a href="#" class="place">
    Place Bet<span>Total: {$cart.placed_amount || 0}</span>
  </a>
</div>
