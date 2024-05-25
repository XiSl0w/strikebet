<script>
  import { page } from "$app/stores";
  $: currentPage = $page.url.pathname;
  $: mainRoute = currentPage.split("/")[2];
</script>

<nav class="dash">
  <h1>STRIKE<span>BET</span></h1>
  <h4>Admin dashboard</h4>
  <a href="/dashboard/users" class:ac-dash={mainRoute === "users"}>
    <i class="fa-solid fa-user"></i> Users
  </a>
  <a href="/dashboard/withdrawals" class:ac-dash={mainRoute === "withdrawals"}>
    <i class="fa-solid fa-receipt"></i> Withdrawals
  </a>
  <a href="/dashboard/bets_history" class:ac-dash={mainRoute === "bets_history"}>
    <i class="fa-solid fa-history"></i> Bets history
  </a>
</nav>
