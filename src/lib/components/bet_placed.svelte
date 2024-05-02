<script>
    export let playername = "playername";
    export let team1 = "team1";
    export let team2 = "team2";
    export let odd = "odd";
    export let won = "<i class='fa-solid fa-check'></i> Won";
    export let lost = `<i class='fa-solid fa-xmark'></i> Lost`;
    export let action = "action";
    export let won1 = "--green4";
    export let lost1 = "--red1";
    export let value = "value";
    export let profit = "profit"
</script>

<div class="old-bet">
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
</div>