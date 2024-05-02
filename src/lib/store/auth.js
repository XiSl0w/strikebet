import { get, writable } from 'svelte/store';

function loadFromLocalStorage() {
	const storedState = globalThis.localStorage?.getItem('strikebet-auth');
	if (storedState) {
		return JSON.parse(storedState);
	}
	return {
		token: null
	};
}

const AuthStore = writable(loadFromLocalStorage());

AuthStore.subscribe((value) => {
	globalThis.localStorage?.setItem('strikebet-auth', JSON.stringify(value));
});

const AuthActions = {
	setToken: (token) => {
		AuthStore.update((state) => {
			state.token = token;
			return state;
		});
	},
	clearToken: () => {
		AuthStore.update((state) => {
			state.token = null;
			return state;
		});
	},
	checkAuth: () => {
		const state = get(AuthStore);
		return state.token !== null;
	},
	getToken: () => {
		const state = get(AuthStore);
		return state.token;
	},
	getAuthHeader: () => {
		const state = get(AuthStore);
		if (state.token) {
			return {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${state.token}`
			};
		}
		return {};
	}
};

export { AuthStore, AuthActions };
