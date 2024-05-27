import { get, writable } from 'svelte/store';
import { addToast } from "$lib/store/toastStore.js";

// Load cart state from local storage or use default state
function loadFromLocalStorage() {
    const storedState = globalThis.localStorage?.getItem('cart');
    if (storedState) {
        return JSON.parse(storedState);
    }
    return {
        items: [],
        placed_amount: 0,
        type: "single",
        open: false
    };
}

const store = writable(loadFromLocalStorage());

// Subscribe to store changes and update local storage
store.subscribe((value) => {
    globalThis.localStorage?.setItem('cart', JSON.stringify(value));
});

const actions = {
    // Add item to the cart
    addItem: (item) => {
        store.update((state) => {
            if (state.items.length > 9) {
                addToast("error", "You can only add up to 10 items to the cart.");
                return state;
            }
            const itemExists = state.items.some(i => i.id === item.id && JSON.stringify(i.match) === JSON.stringify(item.match));
            if (!itemExists) {
                item.odd = parseFloat(item.odd);  // Ensure odd is a float
                state.items.push(item);
                state.placed_amount = state.items.reduce((total, item) => total + parseFloat(item.placed_amount), 0);
            }
            return state;
        });
    },
    // Remove item from the cart
    removeItem: (item) => {
        store.update((state) => {
            state.items = state.items.filter(i => i.id !== item.id || JSON.stringify(i.match) !== JSON.stringify(item.match));
            state.placed_amount = state.items.reduce((total, item) => total + parseFloat(item.placed_amount), 0);
            return state;
        });
    },
    // Update an item in the cart
    updateItem: (updatedItem) => {
        store.update((state) => {
            const index = state.items.findIndex(item => item.id === updatedItem.id && JSON.stringify(item.match) === JSON.stringify(updatedItem.match));
            if (index !== -1) {
                updatedItem.odd = parseFloat(updatedItem.odd);  // Ensure odd is a float
                state.items[index] = updatedItem;
            }
            state.placed_amount = state.items.reduce((total, item) => total + parseFloat(item.placed_amount), 0);
            return state;
        });
    },
    // Update the placed amount for a specific item
    updatePlacedAmount: (item, amount) => {
        store.update((state) => {
            const matchItem = state.items.find(i => i.id === item.id && JSON.stringify(i.match) === JSON.stringify(item.match));
            if (matchItem) {
                matchItem.placed_amount = parseFloat(amount) || 0;
            }
            state.placed_amount = state.items.reduce((total, item) => total + parseFloat(item.placed_amount), 0);
            return state;
        });
    },
    // Clear all items from the cart
    clearCart: () => {
        store.update((state) => {
            state.items = [];
            state.placed_amount = 0;
            return state;
        });
    },
    // Change the cart mode (single or multi)
    changeMode: (mode) => {
        if (mode == "multi") {
            store.update((state) => {
                state.type = "multi";
                state.placed_amount = 0;
                return state;
            });
            return;
        }
        store.update((state) => {
            state.type = "single";
            state.placed_amount = state.items.reduce((total, item) => total + parseFloat(item.placed_amount), 0);
            return state;
        });
    },
};

export { store, actions };