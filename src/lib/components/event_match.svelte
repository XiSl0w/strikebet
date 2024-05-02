<script>
    export let league = 'League';
    export let team1 = 'Team1';
    export let team1_min = 'TM1';
    export let team1_col = '#0F4CD9';
    export let team2 = 'Team2';
    export let team2_min = 'TM2';
    export let team2_col = '#C02A2B';
    export let score1 = 'sc1';
    export let score2 = 'sc2';
    export let odd_draw = "odd-d"
    export let odd_team1 = 'odd1';
    export let odd_team2 = 'odd2';
    export let match_time = 'match_time';
   
</script>

<div class="event">
    <div class="ev-header">
        <img src="{league}.png">
        <h1>{league}</h1>
        <h3>{match_time}</h3>
        <h4><span>DRAW</span> {odd_draw}</h4>
        <a href="#">More game bets</a>
    </div>
    <div class="event-row">
        <h2>
        {team1} <span>{team1_min}</span></h2>

        <h4>{odd_team1}</h4>

        <h3>{score1} x {score2}</h3>

        <h4>{odd_team2}</h4>

        <h2>
        {team2} <span>{team2_min}</span></h2>
    </div>
</div>