<script>
    import { AuthStore, AuthActions } from '$lib/store/auth.js';
    import User from '$lib/store/user.js';
    import { get } from 'svelte/store';
    $: user_info = get(User);
</script>

<nav>
    <a href="#" class="logo">
        <span>STRIKE</span>BET
    </a>
    <a href="/" class="link">Sports</a>
    <a href="/bets" class="link">Bets</a>
    <a href="/history" class="link">History</a>
    <span class="spacer"></span>
    {#if AuthActions.checkAuth()}
        <a href="/account" class="account"><i class="fa-solid fa-user"></i>{user_info.Username}</a>
        <a href="/logout" class="logout" on:click={AuthActions.clearToken}
        ><i class="fa-solid fa-right-to-bracket"></i>Logout</a>
    {:else}
    <a href="/login" class="login"><i class="fa-solid fa-right-to-bracket"></i>Login</a>
    {/if}
</nav>