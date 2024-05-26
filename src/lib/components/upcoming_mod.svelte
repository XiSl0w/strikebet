<script>
    export let league = 'League';
    export let team1 = 'Team1';
    export let team1_img = 'TM1.png';
    export let team2 = 'Team2';
    export let team2_img = 'TM2.png';
    export let odd_draw = "odd-d"
    export let odd_team1 = 'odd1';
    export let odd_team2 = 'odd2';
    export let game_mins = "mins";
    export let fixture_id = "fixture_id"
</script>

<div class="live-game">
    <span class="upcoming-indicator"><div class="pulse"></div>UPCOMING</span>
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
        <b>{game_mins}</b>
    </h3>
    <h3 class="league">{team1}  vs {team2}<br>{league}</h3>
    <div class="team"></div>
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
    <div class="more-bets">
        <a href="/extra_bets/{fixture_id}">More Bets</a>
    </div>
</div>

<style>
    .more-bets {
        text-align: center;
    }

    .more-bets a {
        background: var(--accent1);
        padding: 12px;
        width: 100%;
        color: #fff;
        margin-top: .6rem;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>