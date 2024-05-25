import { writable } from 'svelte/store';
import { AuthActions } from '$lib/store/auth.js';

function createUserDetails() {
  const { subscribe, set, update } = writable({
    Balance: null,
    CreatedAt: null,
    CreatedBy: null,
    ID: null,
    Password: null,
    Role: null,
    Suspended: null,
    Username: null,
    created_users: []
  });

  async function UpdateDetails() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const setDetails = (data) => {
      update(details => ({ ...details, ...data }));
    };

    if (!AuthActions.checkAuth()) {
      setDetails({
        Balance: null,
        CreatedAt: null,
        CreatedBy: null,
        ID: null,
        Password: null,
        Role: null,
        Suspended: null,
        Username: null,
        created_users: []
      });
      return false;
    }

    const response = await fetch('http://127.0.0.1:3220/users/@me', {
      method: 'GET',
      headers: AuthActions.getAuthHeader()
    });

    if (response.ok) {
      const data = await response.json();
      setDetails(data);
      return true;
    } else {
      AuthActions.clearToken();
      return false;
    }
  }

  return {
    subscribe,
    set,
    update,
    UpdateDetails
  };
}

export const userDetails = createUserDetails();