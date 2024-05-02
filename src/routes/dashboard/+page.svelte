<script>
    import BetterHeader from "$lib/components/better_header.svelte";
    import SellerHeader from "$lib/components/seller_header.svelte";
    import Acp from "$lib/components/acp.svelte";
    import Scp from "$lib/components/scp.svelte";
    import Withdrawals from "$lib/components/withdrawals.svelte";
    import UserViewAcp from "$lib/components/user-view-acp.svelte";
</script>
<div class="dash-container">
    <nav class="dash">
        <h1>STRIKE<span>BET</span></h1>
        <h4>Admin dashboard</h4>
        <a href="#" class="ac-dash">
            <i class="fa-solid fa-user"></i> Users
        </a>
        <a href="#">
            <i class="fa-solid fa-user-tie"></i> Sellers
        </a>
        <a href="#">
            <i class="fa-solid fa-receipt"></i> Withdrawals
        </a>
    </nav>
    <main class="dashboard">
        <BetterHeader />
        <SellerHeader />
        <Acp />
        <Scp />
        <Withdrawals />
        <UserViewAcp />
    </main>
</div>
