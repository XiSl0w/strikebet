<script>
    import League from "$lib/components/league.svelte";
    import { onMount } from "svelte";
    import { AuthStore, AuthActions } from '$lib/store/auth.js';
    import LeagueStore from '$lib/store/leagues.js';
    let leagues = [];

    onMount(async () => {
        const response = await fetch('http://127.0.0.1:3220/bets/leagues', {
            method: 'GET',
            headers: AuthActions.getAuthHeader()
        });
		if (response.ok) {
            const res = await response.json();
            leagues = res.response;
            LeagueStore.set(leagues);
		}
    })
</script>

<div class="filters">
    <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Search...">
    </div>
    {#each leagues as league}
        <League LeagueObject={league} />
    {/each}
</div>