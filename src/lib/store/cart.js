import { writable } from 'svelte/store';

export default writable({
    "items": [],
    "total": 0,
    "type": "single"
});