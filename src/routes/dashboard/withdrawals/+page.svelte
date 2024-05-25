<script>
  import Select from "svelte-select";
  import DashNav from "$lib/components/dash_nav.svelte";
  import {onMount} from "svelte";
  import { AuthActions } from "$lib/store/auth.js";
  import { addToast } from '$lib/store/toastStore.js';
  let collection = [
    { value: "Pending", label: "Pending" },
    { value: "Rejected", label: "Rejected" },
    { value: "Sent", label: "Sent" },
  ];

  import {
    DateInput,
    DatePicker,
    localeFromDateFnsLocale,
  } from "date-picker-svelte";
  let date = new Date();

  let withdrawals = []
  let filter = {
    search: "",
    status: "",
    date_end: "",
  };
  $: display = withdrawals.filter((withdrawal) => {
    let search = filter.search
      ? withdrawal.User.Username.toLowerCase().includes(filter.search.toLowerCase())
      : true;
    let status = filter.status
      ? filter.status.includes(withdrawal.Status)
      : true;
    let date_end = filter.date_end
      ? new Date(withdrawal.CreatedAt) <= new Date(filter.date_end)
      : true;
    return search && status && date_end;
  });

  async function get_data() {
    const res = await fetch("http://127.0.0.1:3220/users/withdrawals", {
      method: "GET",
      headers: AuthActions.getAuthHeader(),
    });
    withdrawals = await res.json();
  }

  onMount(async () => {
    await get_data();
  });

  async function updateStatus(id, status) {
    const result = await fetch(`http://127.0.0.1:3220/users/withdrawals/${id}/${status}`, {
      method: "PATCH",
      headers: AuthActions.getAuthHeader(),
    });
    if (result.ok) {
      await get_data();
      addToast('success', 'Status updated successfully');
    } else {
      addToast('error', 'Failed to update status');
    }
  }

  async function Delete(id) {
    const result = await fetch(`http://127.0.0.1:3220/users/withdrawals/${id}`, {
      method: "DELETE",
      headers: AuthActions.getAuthHeader(),
    });
    if (result.ok) {
      await get_data();
      addToast('success', 'Withdrawal deleted successfully');
    } else {
      addToast('error', 'Failed to delete withdrawal');
    }
  }
</script>

<div class="dash-container">
  <DashNav />
  <main class="dashboard">
    <div class="full-w">
      <h1 class="dash-t">withdrawals</h1>
      <div class="admin-h">
        <div class="a-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." on:input={(e) => {
            filter.search = e.target.value;
          }} />
        </div>
        <h3>Status:</h3>
        <Select
          items={collection}
          placeholder="Status"
          multiple
          listAutoWidth={true}
          searchable={false}
          showChevron
          on:input={(e) => {
            if (e.detail === null) {
              filter.status = "";
              return;
            }
            filter.status = e.detail.map((status) => status.value);
          }}
        />
        <h3>Filter by date:</h3>
        <DateInput
          format="yyyy/MM/dd HH:mm:ss"
          placeholder="2000/31/12 23:59:59"
          on:select={(e) => {
            filter.date_end = e.detail;
          }}
        />
        <a href="#" class="blocks" on:click|preventDefault={() => Delete('all')}>DELETE ALL WITHDRAWALS</a>
      </div>
      <div class="dash-table-container" style="margin-top: 20px;">
        <div class="better-header">
          <h1>ID</h1>
          <h1>Amount</h1>
          <h1>Status</h1>
          <h1>User</h1>
          <h1>Created on</h1>
          <h1>Actions</h1>
        </div>
        {#each display as withdrawal}
          <div class="better-rows">
            <h1>{withdrawal.ID}</h1>
            <h1>{withdrawal.Amount}</h1>
            <h1><span class="{withdrawal.Status === 'Sent' ? 'sent' : withdrawal.Status === 'Pending' ? 'unsent' : 'failed'}"
            >{withdrawal.Status}</span></h1>
            <h1>{withdrawal.User.Username}</h1>
            <h1>{withdrawal.CreatedAt}</h1>
            <div>
                <a href="#" class="adds"
                on:click|preventDefault={() => updateStatus(withdrawal.ID, 'Sent')}>Mark As Sent</a>
                <a href="#" class="blocks" on:click|preventDefault={() => updateStatus(withdrawal.ID, 'Rejected')}>Mark As Rejected</a>
                <a href="#" class="deletes"
                on:click|preventDefault={() => Delete(withdrawal.ID)}>Delete</a>
                <a href="/dashboard/users/{withdrawal.User.ID}" class="edits">User info</a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </main>
</div>
