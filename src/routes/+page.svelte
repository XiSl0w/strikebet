<script>
  import LiveGame from "$lib/components/live_game.svelte";
  import EventMatch from "$lib/components/event_match.svelte";
  import League from "$lib/components/league.svelte";
  import Upcoming from "$lib/components/upcoming.svelte";
  import PlacedBets from "$lib/components/cart.svelte";
  import { onMount } from "svelte";
  import { AuthActions } from "$lib/store/auth.js";
  import { useConveyer } from "@egjs/svelte-conveyer";
  import BettingData from "$lib/store/betting.js";
  const { ref } = useConveyer();
  let leagues = [];
  let live_matches = [];
  let upcoming_matches = [];
  let selected_league = "All";
  let loading_live = true;
  let loading_upcoming = true;

  $: display_live = live_matches.filter((match) => match.league.name === selected_league || selected_league === "All");
  $: display_upcoming = upcoming_matches.filter((match) => match.league.name === selected_league || selected_league === "All");
  $: selected_league = $BettingData.League;

  async function get_live_data() {
    let response = await fetch("http://127.0.0.1:3220/bets/matches/odds/live", {
      method: "GET",
      headers: AuthActions.getAuthHeader(),
    });
    if (response.ok) {
      const res = await response.json();
      leagues = res.leagues.sort((a, b) => a.name.localeCompare(b.name));
      live_matches = res.matches;
    }
    loading_live = false;
  }

  async function get_upcoming_data() {
    let tomorrows_date = new Date();
    tomorrows_date.setDate(tomorrows_date.getDate() + 1);
    let year = tomorrows_date.getFullYear();
    let month = String(tomorrows_date.getMonth() + 1).padStart(2, '0');
    let day = String(tomorrows_date.getDate()).padStart(2, '0');
    let date = `${year}-${month}-${day}`;
    let response = await fetch(`http://127.0.0.1:3220/bets/pre-match/odds?date=${date}`, {
      method: "GET",
      headers: AuthActions.getAuthHeader(),
    });
    if (response.ok) {
      const res = await response.json();
      const temp = [
        ...leagues,
        ...res.leagues.sort((a, b) => a.name.localeCompare(b.name)),
      ];
      leagues = temp.filter((league, index, self) => self.findIndex((t) => t.name === league.name) === index);
      upcoming_matches = res.matches;
      console.log(res)
    }
    loading_upcoming = false;
  }

  function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getUTCHours();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${year}-${month}-${day} - ${formattedHours}${period}`;
  }

  onMount(async () => {
    await get_live_data();
    get_upcoming_data();
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
      {#if loading_live}
        <div class="bets-loading">
          <div class="loader"></div>
          Loading live matches...
        </div>
      {:else if display_live.length == 0}
        <div class="bets-loading">
          No live matches available
        </div>
      {/if}
      {#each display_live as match}
        {#if match.full_time_odds.home !== null}
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
              fixture_id={match.fixture.id}
            />
        {/if}
      {/each}
    </div>

    <h1>Upcoming events</h1>
    
    {#if loading_upcoming}
      <div class="bets-loading">
        <div class="loader"></div>
        Loading upcoming matches...
      </div>
    {:else if display_upcoming.length == 0}
      <div class="bets-loading">
        No upcoming matches available
      </div>
    {/if}
    {#each display_upcoming as match}
    <!-- <EventMatch
      league="Premier"
      match_time="17:00 PM"
      team1="Chelsea"
      team1_min="CHE"
      odd_team1="1.03"
      score1="0"
      team2="Manchester United"
      team2_min="MCU"
      odd_team2="3.97"
      score2="0"
      odd_draw="2.56"
    /> -->
      <EventMatch
        league={match.league.name}
        league_logo={match.league.logo}
        match_time={formatDateTime(match.fixture.date)}
        team1={match.teams.home.name}
        team2={match.teams.away.name}
        team1_icon={match.teams.home.logo}
        team2_icon={match.teams.away.logo}
        odd_team1={match.full_time_odds?.home ?? "N/A"}
        odd_team2={match.full_time_odds?.away ?? "N/A"}
        odd_draw={match.full_time_odds?.draw ?? "N/A"}
      />
    {/each}

  </div>

  <PlacedBets />
</main>
