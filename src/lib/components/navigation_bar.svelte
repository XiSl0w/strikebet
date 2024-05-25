<script>
  import { AuthActions } from "$lib/store/auth.js";
  import { userDetails } from "$lib/store/userDetails.js";
  export let currentRoute;
</script>

<nav>
  <a href="/" class="logo">
    <span>STRIKE</span>BET
  </a>
  <a href="/" class="link" class:activelink={currentRoute === ""}>Sports</a>
  <a href="/history" class="link" class:activelink={currentRoute === "history"}
    >History</a
  >
  <a href="/withdraw" class="link" class:activelink={currentRoute === "withdraw"}>Withdraw</a>
  <span class="spacer"></span>
  {#if AuthActions.checkAuth()}
    <a
      href="/withdraw"
      class="account"
      class:activelink={currentRoute === "account"}
      ><i class="fa-solid fa-user"></i>{$userDetails.Username ? `${$userDetails.Username} $${$userDetails.Balance}` : 0}</a
    >
    <a href="/logout" class="logout" on:click={() => AuthActions.clearToken()}
      ><i class="fa-solid fa-right-to-bracket"></i>Logout</a
    >
  {:else}
    <a href="/login" class="login"
      ><i class="fa-solid fa-right-to-bracket"></i>Login</a
    >
  {/if}
</nav>
