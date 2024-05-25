<script>
  export let team1 = "Team 1";
  export let team2 = "Team 2";
  export let action = "win";
  export let league = "League";
  export let odd = "1.5";
  export let player = "Player";
  export let action_player = "score";
  export let value = "100";
</script>

<div class="placed">
  <div class="placed-row">
    <p>
      {team1} to {action}<br />
      <span>Against {team2}</span><b>{league}</b>
    </p>
    <h3>{odd}</h3>
    <input type="text" placeholder="Bet value" />
  </div>
  <div class="placed-row">
    <p>
      {player} to {action_player}<br />
      <b>{league}</b>
    </p>
    <h3>{odd}</h3>
    <input type="text" placeholder="Bet value" />
  </div>
  <a href="#" class="place"
    >Place bet
    <span>{value}</span>
  </a>
</div>
