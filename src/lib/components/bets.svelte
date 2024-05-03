<script>
    import BetRow from "./bet_row.svelte";
    import BetHeader from "./bet_header.svelte";
    import PlayerHeader from "./player_header.svelte";
    import PlayerRow from "./player_row.svelte";
    import AdjustHeader from "./adjust_header.svelte";
    import AdjustRow from "./adjust_row.svelte";
    import BetDropdown from "./bet_dropdown.svelte";
</script>

<h1>Game bets</h1>
<div class="league-header">Premier League</div>
<BetHeader />
<BetRow row = '--bg6' team1_col = '#ff0000' team2_col = '#0000ff'/>
<BetRow />
<BetRow row = '--bg6'/>
<BetRow />
<BetRow row = '--bg6'/>
<BetRow />
<BetRow row = '--bg6'/>
<h1>Player bets</h1>
<div class="league-header">Saudi Arabia League</div>
<PlayerHeader />
<PlayerRow row = '--bg6'/>
<PlayerRow />
<PlayerRow row = '--bg6'/>
<PlayerRow />
<div class="league-header">BRASILEIRÃO</div>
<PlayerHeader />
<PlayerRow row = '--bg6'/>
<PlayerRow />
<PlayerRow row = '--bg6'/>
<PlayerRow />
<div class="league-header">SELF ADJUSTING EXAMPLE (AUTO WIDTH)</div>
<AdjustHeader />
<AdjustRow row = '--bg6'/>
<AdjustRow />