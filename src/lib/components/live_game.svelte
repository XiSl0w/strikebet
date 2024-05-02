<script>
    export let league = 'League';
    export let team1 = 'Team1';
    export let team1_img = 'TM1.png';
    export let team2 = 'Team2';
    export let team2_img = 'TM2.png';
    export let score1 = 'sc1';
    export let score2 = 'sc2';
    export let odd_draw = "odd-d"
    export let odd_team1 = 'odd1';
    export let odd_team2 = 'odd2';
    export let game_mins = "mins";
    export let game_period = "game_half"
</script>

<div class="live-game">
    <span class="live-indicator"><div class="ripple"></div>LIVE</span>
    <div class="crests">
        <div class="crest">
            <img src="{team1_img}">
        </div>
        <h3>VS</h3>
        <div class="crest">
            <img src="{team2_img}">
        </div>
    </div>
    <h3 class="time">
        {game_period}<b>{game_mins}'</b>
    </h3>
    <h3 class="league">{league}</h3>
    <div class="team"><h2>{team1}</h2> <b>{score1}</b></div>
    <div class="team"><h2>{team2}</h2> <b>{score2}</b></div>
    <div class="odds">
        <div class="odd">
            HOME <b>{odd_team1}</b>
        </div>
        <div class="odd">
            DRAW <b>{odd_draw}</b>
        </div>
        <div class="odd">
            AWAY <b>{odd_team2}</b>
        </div>
    </div>
</div>