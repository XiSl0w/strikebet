import { writable } from 'svelte/store';

export const toasts = writable([]);

export const addToast = (type, text) => {
  toasts.update(toasts => {
    const id = Math.random().toString(36).substr(2, 9);
    return [...toasts, { id, type, text }];
  });
};

export const removeToast = (id) => {
  toasts.update(toasts => {
    return toasts.filter(toast => toast.id !== id);
  });
};
