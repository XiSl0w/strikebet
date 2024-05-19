<script>
  import LiveGame from "$lib/components/live_game.svelte";
  import EventMatch from "$lib/components/event_match.svelte";
  import League from "$lib/components/league.svelte";
  import Upcoming from "$lib/components/upcoming.svelte";
  import PlacedBets from "$lib/components/placed_bets.svelte";
  import { onMount } from "svelte";
  import { AuthStore, AuthActions } from "$lib/store/auth.js";
  import { useConveyer } from "@egjs/svelte-conveyer";
  import BettingData from "$lib/store/betting.js";
  const { ref } = useConveyer();
  let leagues = [];
  let live_matches = [];
  let odds = [];

  let data = {
    leagues: [],
    live_matches: [],
    selected_league: "All",
  };

  $: data.selected_league = $BettingData.League;

  onMount(async () => {
    let response = await fetch("http://127.0.0.1:3220/bets/matches/odds/live", {
      method: "GET",
      headers: AuthActions.getAuthHeader(),
    });
    if (response.ok) {
      const res = await response.json();
      leagues = res.leagues.sort((a, b) => a.name.localeCompare(b.name));
      live_matches = res.matches;
    }
  });
</script>

<main>
  <div class="filters">
    <div class="search">
      <i class="fa-solid fa-magnifying-glass"></i><input
        type="text"
        placeholder="search"
      />
    </div>
    
    {#if leagues.length !== 0}
      <League
        LeagueObject={{
          name: "All",
          logo: "/world.svg",
        }}
      />
      {#each leagues as league}
        <League LeagueObject={league} />
      {/each}
    {/if}
  </div>

  <div class="live">
    <h1>Live matches</h1>
    <div class="live-games" use:ref>
      {#if live_matches.length === 0}
        <div class="bets-loading">
          <div class="loader"></div>
          Loading live matches...
      </div>
      {/if}
      {#each live_matches as match}
        {#if match.full_time_odds.home !== null}
          {#if match.league.name === data.selected_league || data.selected_league === "All"}
            <LiveGame
              league={match.league.name}
              game_period={match.fixture.status.long}
              game_mins={match.fixture.status.elapsed}
              team1={match.teams.home.name}
              team1_img={match.teams.home.logo}
              odd_team1={match.full_time_odds?.home ?? "N/A"}
              score1={match.goals.home}
              team2={match.teams.away.name}
              team2_img={match.teams.away.logo}
              odd_team2={match.full_time_odds?.away ?? "N/A"}
              score2={match.goals.away}
              odd_draw={match.full_time_odds?.draw ?? "N/A"}
            />
          {/if}
        {/if}
      {/each}
    </div>

    <Upcoming />
  </div>

  <PlacedBets
    league="Premier"
    team1="Manchester United"
    team2="Chelsea"
    action="WIN"
    value="90 Strike Coins"
    odd="3.97"
    player="Cristiano Ronaldo"
    action_player="SCORE 3 GOALS"
  />
</main>
