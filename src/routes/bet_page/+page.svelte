<script>
    import Filters from "$lib/components/filters.svelte";
    import Bets from "$lib/components/bets.svelte";
    import BetDropdown from "$lib/components/bet_dropdown.svelte";
    import PlacedBets from "$lib/components/cart.svelte";
</script>

<main>
    <Filters />


        <div class="live">
        <BetDropdown />
        <BetDropdown />
        <BetDropdown />
        <BetDropdown />
        <BetDropdown />
        
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