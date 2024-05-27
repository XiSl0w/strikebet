<script>
  // @ts-nocheck

  import { onDestroy } from "svelte";
  import { store as cart, actions } from "$lib/store/cart.js";
  import { addToast } from "$lib/store/toastStore.js";
  import { AuthActions } from "$lib/store/auth.js";

  let cartItems;
  let display_timeout = false;

  const unsubscribe = cart.subscribe((value) => {
    cartItems = value.items;
  });

  onDestroy(unsubscribe);

  function handlePlacedAmountChange(item, event) {
    const amount = event.target.value;
    if (amount === "") {
      actions.updatePlacedAmount(item, 0);
      return;
    }
    if (isNaN(amount)) {
      if (!display_timeout) {
        addToast("error", `Please enter a valid number on the bet amount of ${item.match.team1} vs ${item.match.team2}`);
        display_timeout = true
        setTimeout(() => {
          display_timeout = false
        }, 5000);
      }
      return;
    }
    actions.updatePlacedAmount(item, parseFloat(amount));
  }

  async function PlaceBet() {
    let items = [];
    if ($cart.type === "single") {
      items = cartItems.filter((item) => item.placed_amount > 0);
      if (items.length === 0) {
        addToast("error", "Please add a bet to place");
        return;
      }
    } else {
      if ($cart.placed_amount === 0) {
        addToast("error", "Please add a bet amount to place");
        return;
      }
      items = cartItems;
    }
    const _body = {
      items: items,
      type: $cart.type,
      placed_amount: parseFloat($cart.placed_amount)
    }
    console.log(_body)
    const response = await fetch("http://127.0.0.1:3220/bets/place", {
      method: "POST",
      headers: AuthActions.getAuthHeader(),
      body: JSON.stringify(_body),
    });
    const data = await response.json();
    if (response.ok) {
      actions.clearCart();
      addToast("success", data.message);
    } else {
      addToast("error", "An error occurred while placing the bet: " + data.message);
    }
  };

</script>

<details>
  <summary>Bets</summary>
  <div class="placed">
    {#if cartItems.length === 0}
      <p class="empty">No bets placed yet</p>
    {:else}
      <div class="segmented-control">
        <div
          role="button"
          tabindex="0"
          on:click={() => actions.changeMode("single")}
          class:chosen-mode={$cart.type === "single"}
        >
          Single bet
        </div>
        <div
          role="button"
          tabindex="0"
          on:click={() => actions.changeMode("multi")}
          class:chosen-mode={$cart.type === "multi"}
        >
          Multiple
        </div>
      </div>
      {#each cartItems as item}
        <div class="placed-row">
          <!-- <label class="container">
        <input type="checkbox" checked="checked">
        <span class="checkmark"></span>
      </label> -->
          <p>
            {item.match.team1} to {item.match.action}<br />
            <span>Against {item.match.team2}</span> <b>{item.match.league}</b>
          </p>
          <h3>{item.odd}</h3>

          {#if $cart.type === "single"}
            <input
              type="text"
              placeholder="Bet value"
              value={item.placed_amount}
              on:input={(event) => handlePlacedAmountChange(item, event)}
            />
          {/if}

          <span
            class="delete fa fa-trash"
            role="button"
            tabindex="0"
            on:click={() => actions.removeItem(item)}
          ></span>
        </div>
      {/each}
      <!-- <h5>Placing a total of 5 bets with the odd of <b>12.02</b></h5> -->
      {#if $cart.type === "multi"}
        <input
          type="text"
          class="bet_input"
          placeholder="Bet value"
          value={$cart.placed_amount}
          on:input={(event) => $cart.placed_amount = event.target.value}
        />
      {/if}
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="place" on:click={() => PlaceBet()}>
        Place Bet<span>Total: {$cart.placed_amount || 0}</span>
      </a>
    {/if}
  </div>
</details>

<style>
  .bet_input {
    padding: 10px 24px;
    border-radius: 4px;
    background: var(--bg4);
    color: #fff;
    width: 100%;
    border: none;
    text-align: center;
  }
</style>