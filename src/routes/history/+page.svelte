<script>
    import BetPlaced from "$lib/components/bet_placed.svelte";
</script>

<main>
    <div class="title100"><h1>Bet history</h1></div>
    <div class="history">
        <h3>Bets lost</h3>
        <h1 class="lost">1097</h1>
        <h3>Bets won</h3>
        <h1 class="won">1297</h1>
        <h3>Bets canceled <b>102</b></h3>
    </div>
    <BetPlaced />
</main>