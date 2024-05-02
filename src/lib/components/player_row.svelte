<script>
    export let team1_col = "#fff";
    export let team1_min = "tm1";
    export let odd_team1 = "1.20";
    export let handicap = "1.20";
    export let row = "--bg2";
    export let player = "playername";
    export let action = "action"
</script>

<div class="bet-row player" style="background: var({row});">
    <div class="teams">
        <div class="team"><span style="background: {team1_col}"></span>
            <h3>{team1_min} {player} <b>to {action}</b></h3></div>
            <div class="time-row">
                March 1st <b>17:00</b> pm
            </div>
    </div>
    <div class="bet-col">
        <h1><span>{handicap}</span>{odd_team1}</h1>
    </div>
    <div class="bet-col">
        <h1><span>{handicap}</span>{odd_team1}</h1>
    </div>
    <div class="bet-col">
        <h1><span>{handicap}</span>{odd_team1}</h1>
    </div>
    <div class="bet-col">
        <a href="#"><i class="fa-solid fa-plus"></i></a>
    </div>
</div>