<script>
    export let data;
    import { onMount } from 'svelte';
    import { AuthActions } from '$lib/store/auth.js';
    import BetDropdown from "$lib/components/bet_dropdown.svelte";
    import PlacedBets from "$lib/components/cart.svelte";
    import BetRow from "$lib/components/bet_row.svelte";
    import BetHeader from "$lib/components/bet_header.svelte";
    import PlayerHeader from "$lib/components/player_header.svelte";
    import PlayerRow from "$lib/components/player_row.svelte";
    import AdjustHeader from "$lib/components/adjust_header.svelte";
    import AdjustRow from "$lib/components/adjust_row.svelte";
    import collapse from 'svelte-collapse'
    let open = false


    let loading = true;
    let MatchName = "Loading...";
    let Error = "";
    let bets = [];

    onMount(async () => {
        let response = await fetch(`http://127.0.0.1:3220/bets/matches/odds/live/modified?fixture=${data.fixture_id}`, {
            method: "GET",
            headers: AuthActions.getAuthHeader()
        });
        if (response.ok) {
            const res = await response.json();
            const match = res.matches[0];
            const status = match?.betting_status;
            if (status && status.stopped || status.blocked || status.finished) {
                loading = false;
                const cause = status.stopped ? "stopped" : status.blocked ? "blocked" : "finished";
                Error = `Betting is ${cause} for this match.`;
                return;
            }
            MatchName = match.teams.home.name + " vs. " + match.teams.away.name;
            match.betting_odds.forEach(bet => {
                bet = {
                    ...bet,
                    open: false
                }
            });
            bets = match.betting_odds;
            loading = false;
        } else {
            loading = false;
            Error = "No bets available";
        }
    });


</script>

<main>
    <div class="live">
        {#if loading} 
            <div class="bets-loading">
                <div class="loader"></div>
                Our bets are loading...
            </div>
        {:else if bets.length === 0}
            <div class="bets-loading">
                {Error}
            </div>
        {:else}
            <h1>{MatchName}</h1>
            {#each bets as bet}
                <div class="league-header" on:click={() => bet.open = !bet.open}>{bet.name} <i class="fa-solid fa-chevron-down"></i></div>
                <div use:collapse={bet.open} class="bet-container-mobile">

                    <div class="bet-header">
                        {#each bet.headers as bet_hdr}
                            <div class="bet-col">
                                <h2>{bet_hdr}</h2>
                            </div>
                        {/each}
                    </div>

                    {#each bet.rows as row}
                        <div class="bet-row" style="background: var(--bg6);">
                            {#each bet.headers as header}
                                <div class="bet-col">
                                    {#if row[header]["handicap"]}
                                        <h1><span>{row[header]["handicap"]}</span>{row[header]["odd"]}</h1>
                                    {:else}
                                        <h1>{row[header]["odd"]}</h1>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    {/each}
                </div>
            {/each}


            <div class="league-header" on:click={() => open = !open}>Premier League <i class="fa-solid fa-chevron-down"></i></div>

            <div use:collapse={{open}} class="bet-container-mobile">

                

                <div class="bet-header">
                    <div class="teams">
                        <h2>Teams</h2>
                    </div>
                    <div class="bet-col">
                        <h2>Handicap</h2>
                    </div>
                    <div class="bet-col">
                        <h2>Total</h2>
                    </div>
                    <div class="bet-col">
                        <h2>To win</h2>
                    </div>
                    <div class="bet-col">
                        <h2>More bets</h2>
                    </div>
                </div>

                
                <BetRow row = '--bg6' team1_col = '#ff0000' team2_col = '#0000ff'/>
                <BetRow />
                <BetRow row = '--bg6'/>
                <BetRow />
                <BetRow row = '--bg6'/>
                <BetRow />
                <BetRow row = '--bg6'/>
                <h1>this is self adjusting rows for other bet types</h1>
                <AdjustHeader />
                <AdjustRow row = '--bg6'/>
                <AdjustRow />
            </div>
        {/if}

    

        <!-- <PlacedBets
    league="Premier"
    team1="Manchester United"
    team2="Chelsea"
    action="WIN"
    value="90 Strike Coins"
    odd="3.97"
    player="Cristiano Ronaldo"
    action_player="SCORE 3 GOALS"
  /> -->

        </div>
</main>