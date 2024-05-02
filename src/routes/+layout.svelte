<script>
	import { page } from "$app/stores";
	$: currentPage = $page.url.pathname;
	$: mainRoute = currentPage.split("/")[1];
	import NavigationBar from '$lib/components/navigation_bar.svelte';
	import Footer from "$lib/components/footer.svelte";
	import { AuthStore, AuthActions } from '$lib/store/auth.js';
	import { onMount } from 'svelte';
	import User from '$lib/store/user.js';

    
    onMount(async () => {
		if (!AuthActions.checkAuth()) {
			if (currentPage !== '/login') {
				window.location.href = '/login';
			}
		}
		const response = await fetch('http://127.0.0.1:3220/users/@me', {
            method: 'GET',
            headers: AuthActions.getAuthHeader()
        });
		if (response.ok) {
			console.log('User is logged in');
			const user = await response.json();
			User.set(user);
			console.log(user);
		} else {
			AuthActions.clearToken();
			if (currentPage !== '/login') {
				window.location.href = '/login';
			}
		}
	});
</script>

<body>
	{#if currentPage !== '/dashboard'}
		<NavigationBar currentRoute={mainRoute} />
	{/if}
	<slot />
	{#if currentPage !== '/dashboard'}
	<Footer />
	{/if}
</body>
