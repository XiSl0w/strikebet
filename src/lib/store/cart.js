import { get, writable } from 'svelte/store';

function loadFromLocalStorage() {
    const storedState = globalThis.localStorage?.getItem('cart');
    if (storedState) {
        return JSON.parse(storedState);
    }
    return {
        items: [{
            match: {
                id: 0,
                league: "League",
                team1: "Team 1",
                team2: "Team 2",
                action: "win",
            },
            id: 0,
            odd: 1.5,
            placed_amount: 0,
        }],
        placed_amount: 0,
        type: "single",
        open: false
    };
}

const store = writable(loadFromLocalStorage());

store.subscribe((value) => {
    globalThis.localStorage?.setItem('cart', JSON.stringify(value));
});

const actions = {
    addItem: (item) => {
        store.update((state) => {
            state.items.push(item);
            state.placed_amount = state.items.reduce((total, item) => total + parseFloat(item.placed_amount), 0);
            return state;
        });
    },
    removeItem: (itemId) => {
        store.update((state) => {
            state.items = state.items.filter(item => item.id !== itemId);
            state.placed_amount = state.items.reduce((total, item) => total + parseFloat(item.placed_amount), 0);
            return state;
        });
    },
    updateItem: (updatedItem) => {
        store.update((state) => {
            const index = state.items.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
                state.items[index] = updatedItem;
            }
            state.placed_amount = state.items.reduce((total, item) => total + parseFloat(item.placed_amount), 0);
            return state;
        });
    },
    updatePlacedAmount: (itemId, amount) => {
        store.update((state) => {
            const item = state.items.find(item => item.id === itemId);
            if (item) {
                item.placed_amount = parseFloat(amount) || 0;
            }
            state.placed_amount = state.items.reduce((total, item) => total + item.placed_amount, 0);
            return state;
        });
    },
    clearCart: () => {
        store.update((state) => {
            state.items = [];
            state.placed_amount = 0;
            return state;
        });
    }
};

export { store, actions };
