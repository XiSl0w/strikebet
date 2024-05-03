<script lang="ts">
    import BetRow from "./bet_row.svelte";
    import BetHeader from "./bet_header.svelte";
    import PlayerHeader from "./player_header.svelte";
    import PlayerRow from "./player_row.svelte";
    import AdjustHeader from "./adjust_header.svelte";
    import AdjustRow from "./adjust_row.svelte";
    import collapse from 'svelte-collapse'
    let open = false
</script>

<div class="league-header" on:click={() => open = !open}>Premier League <i class="fa-solid fa-chevron-down"></i></div>

<div use:collapse={{open}} class="bet-container-mobile">
    <BetHeader/>
    <BetRow row = '--bg6' team1_col = '#ff0000' team2_col = '#0000ff'/>
        <BetRow />
        <BetRow row = '--bg6'/>
        <BetRow />
        <BetRow row = '--bg6'/>
        <BetRow />
        <BetRow row = '--bg6'/>
        <h1>this is self adjusting rows for other bet types</h1>
        <AdjustHeader />
        <AdjustRow row = '--bg6'/>
        <AdjustRow />
</div>
    




