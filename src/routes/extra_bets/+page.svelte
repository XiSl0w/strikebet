<script>
    import Filters from "$lib/components/filters.svelte";
    import Bets from "$lib/components/bets.svelte";
    import BetDropdown from "$lib/components/bet_dropdown.svelte";
    import PlacedBets from "$lib/components/placed_bets.svelte";
</script>

<main>
    <Filters />


        <div class="live">
            <h1>Game name bet</h1>
        <BetDropdown />
        <BetDropdown />
        <BetDropdown />
        <BetDropdown />
        <BetDropdown />

        <div class="bets-loading">
            <div class="loader"></div>
            Our bets are loading...
        </div>

        <PlacedBets
    league="Premier"
    team1="Manchester United"
    team2="Chelsea"
    action="WIN"
    value="90 Strike Coins"
    odd="3.97"
    player="Cristiano Ronaldo"
    action_player="SCORE 3 GOALS"
  />

        </div>
</main>