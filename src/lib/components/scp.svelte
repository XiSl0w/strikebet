<script>
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
    <h1 class="dash-t">Seller control panel</h1>
    <div class="admin-h">
        <div class="a-search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search...">
        </div>
        <a href="#" class="adds">CREATE NEW USER</a>
        <h3>Filters:</h3>
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
</div>