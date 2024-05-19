import { writable } from 'svelte/store';
import { AuthActions } from '$lib/store/auth.js';

function createCart() {
  const { subscribe, set, update } = writable({
    items: [],
    total: 0
  });

  function addToCart(item) {
    update(cart => {
      const updatedItems = [...cart.items, item];
      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);
      return { ...cart, items: updatedItems, total: updatedTotal };
    });
  }

  function removeFromCart(itemId) {
    update(cart => {
      const updatedItems = cart.items.filter(item => item.id !== itemId);
      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);
      return { ...cart, items: updatedItems, total: updatedTotal };
    });
  }

  function clearCart() {
    set({ items: [], total: 0 });
  }

  async function placeBet(matchId, betType) {
    const response = await fetch('http://127.0.0.1:3220/bets/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...AuthActions.getAuthHeader()
      },
      body: JSON.stringify({
        items: get().items,
        match_id: matchId,
        type: betType
      })
    });

    if (response.ok) {
      clearCart();
      return { success: true, message: 'Bet placed successfully' };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  }

  return {
    subscribe,
    addToCart,
    removeFromCart,
    clearCart,
    placeBet
  };
}

export const cart = createCart();