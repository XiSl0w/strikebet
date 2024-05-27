<script>
    import { onMount } from "svelte";
    import { AuthActions } from "$lib/store/auth.js";
    let stats = {
        "Cancelled": 0,
        "Lost": 0,
        "Pending": 0,
        "Won": 0
    }
    let bets = [];

    onMount(async () => {
        const res = await fetch("http://127.0.0.1:3220/bets/@me",
            {
                method: "GET",
                headers: AuthActions.getAuthHeader(),
            }
        );
        const data = await res.json();
        bets = data.bets;
        stats = data.stats;
    })
</script>

<main>
    <div class="title100"><h1>Bet history</h1></div>
    <div class="history">
        <h3>Bets lost</h3>
        <h1 class="lost">{stats.Lost}</h1>
        <h3>Bets won</h3>
        <h1 class="won">{stats.Won}</h1>
        <h3>Bets cancelled</h3>
        <h1 class="cancelled">{stats.Cancelled}</h1>
        <h3>Bets pending</h3>
        <h1 class="pending">{stats.Pending}</h1>
    </div>
    <!-- <div class="old-bet">
        <div class="row-action">
            <span class="result" style="background-color: var({lost1});"></span>
            <h1>{playername} <span>to {action}</span></h1>
            <h3>{odd}</h3>
        </div>
        <div class="row-action">
            <span class="result" style="background-color: var({won1});"></span>
            <h1>{playername} <span>to {action}</span></h1>
            <h3>{odd}</h3>
        </div>
        <div class="row-action">
            <span class="result" style="background-color: var({lost1});"></span>
            <h1>{playername} <span>to {action}</span></h1>
            <h3>{odd}</h3>
        </div>
        <div class="total-odds">
            <h3 class="lost">{@html lost}</h3><h4>{odd}</h4><h2>Bet value: {value}</h2>
            <h1 class="lost">-{profit}</h1>
        </div>
    </div>
    
    <div class="old-bet">
        <div class="row-action">
            <span class="result" style="background-color: var({won1});"></span>
            <h1>{playername} <span>to {action}</span></h1>
            <h3>{odd}</h3>
        </div>
        <div class="total-odds">
            <h3 class="won">{@html won}</h3><h4>{odd}</h4><h2>Bet value: {value}</h2>
            <h1 class="won">+{profit}</h1>
        </div>
    </div> -->
    <!-- "bets": [
        {
            "CreatedAt": "2024-05-27 09:41:07",
            "ExpectedProfit": 615.0,
            "ID": 1,
            "Items": [
                {
                    "id": 1,
                    "match": {
                        "action": "draw",
                        "id": 1158700,
                        "league": "Liga Profesional Argentina",
                        "team1": "Atletico Tucuman",
                        "team2": "Platense"
                    },
                    "odd": 3,
                    "placed_amount": 0
                },
                {
                    "id": 1,
                    "match": {
                        "action": "win",
                        "id": 1158700,
                        "league": "Liga Profesional Argentina",
                        "team1": "Atletico Tucuman",
                        "team2": "Platense"
                    },
                    "odd": 2.05,
                    "placed_amount": 0
                }
            ],
            "Status": "Pending",
            "TotalPlaced": 100.0,
            "Type": "multi",
            "UserID": 1
        }
    ] -->
    {#each bets as bet}
        <div class="old-bet">
            {#each bet.Items as item}
                <div class="row-action">
                    <span class="result" style="background-color: var(--lost1);"></span>
                    <h1>{item.match.team1} <span>to {item.match.action}</span></h1>
                    <h3>{item.odd}</h3>
                </div>
            {/each}
            <div class="total-odds">
                <h3 class="{bet.Status.toLowerCase()}">{bet.Status}</h3><h4>Amount placed: {bet.TotalPlaced}</h4><h2>Bet value: {bet.ExpectedProfit}</h2>
                {#if bet.Status != "Pending" && bet.Status != "Cancelled"}
                    <h1 class="{bet.Status.toLowerCase()}">
                        {#if bet.Status == "Lost"}
                            -{bet.TotalPlaced}
                        {:else}
                            +{bet.ExpectedProfit}
                        {/if}
                    </h1>
                {/if}
            </div>
        </div>
    {/each}
</main>