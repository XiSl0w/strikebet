<script>
    export let league = 'League';
    export let team1 = 'Team1';
    export let team2 = 'Team2';
    export let action = "action";
    export let value = "value";
    export let odd = "odd";
    export let player = "playername";
    export let action_player = "actionplayer";
</script>
  
  <div class="placed">
    <div class="placed-row">
        <p>{team1} to {action}<br>
            <span>Against {team2}</span><b>{league}</b></p>
        <h3>{odd}</h3>
        <input type="text" placeholder="Bet value">
    </div>
    <div class="placed-row">
        <p>{player} to {action_player}<br>
        <b>{league}</b></p>
        <h3>{odd}</h3>
        <input type="text" placeholder="Bet value">
    </div>
    <a href="#" class="place">Place bet
        <span>{value}</span>
    </a>
  </div>