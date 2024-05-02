<script>
    export let team1_col = "#fff";
    export let team1 = "team1";
    export let team1_min = "tm1";
    export let odd_team1 = "1.20";
    export let handicap = "1.20";
    export let team2_col = "#fff";
    export let team2 = "team1";
    export let team2_min = "tm1";
    export let odd_team2 = "1.20";
    export let row = "--bg2";
</script>

<div class="bet-row" style="background: var({row});">
    <div class="teams">
        <div class="team"><span style="background: {team1_col}"></span>
            <h3>{team1_min} {team1}</h3></div>
        <div class="team"><span style="background: {team2_col}"></span>
            <h3>{team2_min} {team2}</h3></div>
        <div class="time-row">
            <b>41:32</b> 2nd half
        </div>
    </div>
    <div class="bet-col">
        <h1><span>{handicap}</span>{odd_team1}</h1>
        <h1><span>{handicap}</span>{odd_team2}</h1>
    </div>
    <div class="bet-col">
        <h1><span>{handicap}</span>{odd_team1}</h1>
        <h1><span>{handicap}</span>{odd_team2}</h1>
    </div>
    <div class="bet-col">
        <h1><span>{handicap}</span>{odd_team1}</h1>
        <h1><span>{handicap}</span>{odd_team2}</h1>
    </div>
    <div class="bet-col">
        <a href="#"><i class="fa-solid fa-plus"></i></a>
    </div>
</div>