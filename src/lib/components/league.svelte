<script>
     export let LeagueObject;
    import BettingData from "$lib/store/betting.js";
</script>

<div class="leagues" class:active={$BettingData.League === LeagueObject.name} on:click={() => $BettingData.League = LeagueObject.name}>
    <img src="{LeagueObject.logo}">
    {LeagueObject.name}
</div>