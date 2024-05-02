<script>
    import LiveGame from "$lib/components/live_game.svelte";
    import EventMatch from "$lib/components/event_match.svelte";
    import League from "$lib/components/league.svelte";
    import Filters from "$lib/components/filters.svelte";

    import { useConveyer } from "@egjs/svelte-conveyer";

    const {
        ref,
    } = useConveyer();
</script>


    <h1>Live matches</h1>
    <div class="live-games" use:ref>
        <LiveGame 
        league = 'Premier League' game_period = '1st' game_mins = '42'
        team1 = 'Chelsea' team1_min = 'CHE' odd_team1 = '1.03' score1 = '3'
        team2 = 'Manchester United' team2_min = 'MCU' odd_team2 ='3.97' score2 = '1'
        odd_draw = '2.56'
        />
        <LiveGame 
        league = 'Premier League' game_period = '1st' game_mins = '42'
        team1 = 'Chelsea' team1_min = 'CHE' odd_team1 = '1.03' score1 = '3'
        team2 = 'Manchester United' team2_min = 'MCU' odd_team2 ='3.97' score2 = '1'
        odd_draw = '2.56'
        />
        <LiveGame 
        league = 'Premier League' game_period = '1st' game_mins = '42'
        team1 = 'Chelsea' team1_min = 'CHE' odd_team1 = '1.03' score1 = '3'
        team2 = 'Manchester United' team2_min = 'MCU' odd_team2 ='3.97' score2 = '1'
        odd_draw = '2.56'
        />
        <LiveGame 
        league = 'Premier League' game_period = '1st' game_mins = '42'
        team1 = 'Chelsea' team1_min = 'CHE' odd_team1 = '1.03' score1 = '3'
        team2 = 'Manchester United' team2_min = 'MCU' odd_team2 ='3.97' score2 = '1'
        odd_draw = '2.56'
        />
        <LiveGame 
        league = 'Premier League' game_period = '1st' game_mins = '42'
        team1 = 'Chelsea' team1_min = 'CHE' odd_team1 = '1.03' score1 = '3'
        team2 = 'Manchester United' team2_min = 'MCU' odd_team2 ='3.97' score2 = '1'
        odd_draw = '2.56'
        />
        <LiveGame 
        league = 'Premier League' game_period = '1st' game_mins = '42'
        team1 = 'Chelsea' team1_min = 'CHE' odd_team1 = '1.03' score1 = '3'
        team2 = 'Manchester United' team2_min = 'MCU' odd_team2 ='3.97' score2 = '1'
        odd_draw = '2.56'
        />
        <LiveGame 
        league = 'Premier League' game_period = '1st' game_mins = '42'
        team1 = 'Chelsea' team1_min = 'CHE' odd_team1 = '1.03' score1 = '3'
        team2 = 'Manchester United' team2_min = 'MCU' odd_team2 ='3.97' score2 = '1'
        odd_draw = '2.56'
        />
    </div>
