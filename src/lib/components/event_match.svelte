<script>
  export let league = "League";
  export let league_logo = "Premier.png";
  export let team1 = "Team1";
  export let team2 = "Team2";
  export let team1_icon = "Premier.png";
  export let team2_icon = "Premier.png";
  export let odd_draw = "odd-d";
  export let odd_team1 = "odd1";
  export let odd_team2 = "odd2";
  export let match_time = "match_time";
</script>

<div class="event">
  <div class="ev-header">
    <img src="{league_logo}" alt="League icon" />
    <h1>{league}</h1>
    <h3>{match_time}</h3>
    <h4><span>DRAW</span> {odd_draw}</h4>
    <a href="#">More game bets</a>
  </div>
  <div class="event-row">
        <div class="team">
            <div>
                <img src="{team1_icon}" alt="Team1 icon" />
                <h2 style="margin-left: 20px;">{team1}</h2>
            </div>
            <b>{odd_team1}</b>
        </div>
        <div class="team">
            <b>{odd_team2}</b>
            <div>
                <h2 style="margin-right: 20px;">{team2}</h2>
                <img src="{team2_icon}" alt="Team2 icon" />
            </div>
        </div>
  </div>
</div>

<style>
    .team {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
    }

    .team div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }


    .team img {
        width: 50px;
        height: 50px;
    }

    .team h2 {
        flex-grow: 1;
        font-size: 1rem;
        font-weight: 500;
        min-width: 100px;
        text-align: center;
    }

    .team b {
        background: var(--bg3);
        padding: 4px 12px;
        border-radius: 2px;
        margin: .6rem;
        transition: all .3s ease-in-out;
        cursor: pointer;
    }

    .team b:hover {
        background: var(--bg4);
        color: #fff;
    }

    @media (max-width: 768px) {
        .team {
            flex-direction: column;
        }

        .team div {
            flex-direction: column;
            align-items: center;
        }

        .team img {
            width: 50px;
            height: 50px;
        }

        .team h2 {
            font-size: 1.5rem;
            text-align: center;
            margin: 20px;
        }

        .ev-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .ev-header h1 {
            border-bottom: 1px solid var(--bg4);
            border-right: none;
            padding-right: 0;
            padding-bottom: 10px;
            margin: 10px;
        }
    }
</style>