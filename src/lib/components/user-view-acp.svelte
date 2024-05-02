<script>
    import BetPlaced from "./bet_placed.svelte";

    import Select from 'svelte-select';

    let collection = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    import { DateInput, DatePicker, localeFromDateFnsLocale } from 'date-picker-svelte'
	let date = new Date()
</script>
<div class="full-w">
    <h1 class="dash-t">Viewing user <b>username</b></h1>

    <div class="admin-h">
        <a href="#" class="edits">Edit</a>
        <a href="#" class="suspends">Suspend</a>
        <a href="#" class="deletes">Delete</a>
        <a href="#" class="blocks">Block</a>
        <a href="#" class="adds">Add balance</a>
        <a href="#" class="percents">Set seller %</a>
    </div>

    <h1 class="dash-t">Bet history</h1>

    <div class="admin-h">
        <Select items={collection} placeholder="Method"  multiple listAutoWidth={true} searchable={false}
        showChevron />
        <h3>Filter date start:</h3>
	    <DateInput
		format="yyyy/MM/dd HH:mm:ss"
		placeholder="2000/31/12 23:59:59" />
        <h3>Filter date end:</h3>
	    <DateInput
		format="yyyy/MM/dd HH:mm:ss"
		placeholder="2000/31/12 23:59:59" />
        <a href="#" class="filter-do">Apply</a>
    </div>

    <BetPlaced />
</div>