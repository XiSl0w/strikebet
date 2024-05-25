<script>
  import Select from "svelte-select";
  import DashNav from "$lib/components/dash_nav.svelte";
  import ModalContainer from "$lib/components/modal_container.svelte";
  import {onMount} from "svelte";
  import { AuthActions } from "$lib/store/auth.js";
  import { addToast } from "$lib/store/toastStore.js";
  let collection = [
    { value: "admin", label: "Admins" },
    { value: "seller", label: "Sellers" },
    { value: "user", label: "Users" },
  ];

  let creating_user = {
    isOpen: false,
    closeModal: () => {
      creating_user.isOpen = false;
    },
    input_details: {
        username: "",
        password: "",
        role: "user",
        balance: 0
    },
    create: async () => {
      const res = await fetch("http://127.0.0.1:3220/users/register", {
        method: "POST",
        headers: AuthActions.getAuthHeader(),
        body: JSON.stringify(creating_user.input_details),
      });
      if (res.ok) {
        addToast("success", "User created successfully");
        creating_user.closeModal();
      } else {
        addToast("error", "Failed to create user");
      }
    }
  }

  import {
    DateInput,
    DatePicker,
    localeFromDateFnsLocale,
  } from "date-picker-svelte";
  let date = new Date();

  let users = []
  let filter = {
    search: "",
    roles: "",
    date_start: "",
    date_end: "",
  };
  $: displayUsers = users.filter((user) => {
    let roles = filter.roles ? filter.roles.includes(user.Role) : true;
    let search = filter.search
      ? user.Username.toLowerCase().includes(filter.search.toLowerCase())
      : true;
    let date_start = filter.date_start
      ? new Date(user.CreatedAt) >= new Date(filter.date_start)
      : true;
    let date_end = filter.date_end
      ? new Date(user.CreatedAt) <= new Date(filter.date_end)
      : true;
    return roles && search && date_start && date_end;
  });

  onMount(async () => {
    const res = await fetch("http://127.0.0.1:3220/users/", {
      method: "GET",
      headers: AuthActions.getAuthHeader(),
    });
    if (res.ok) {
      users = await res.json();
    } else {
      const error = await res.json();
      addToast("error", "Failed to fetch users, " + error.message);
    }
  });

</script>

<div class="dash-container">
  <DashNav />
  <main class="dashboard">
    <div class="full-w">
      <h1 class="dash-t">Users</h1>
      <div class="admin-h">
        <div class="a-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." on:input={(e) => {
            filter.search = e.target.value;
          }} />
        </div>
        <a href="#" class="adds"
        on:click|preventDefault={() => creating_user.isOpen = true}>CREATE NEW USER</a>
        <h3>Role:</h3>
        <Select
          items={collection}
          placeholder="Roles"
          multiple
          listAutoWidth={true}
          searchable={false}
          showChevron
          on:input={(e) => {
            if (e.detail === null) {
              filter.roles = "";
              return;
            }
            filter.roles = e.detail.map((role) => role.value);
          }}
        />
        <h3>Filter date start:</h3>
        <DateInput
          format="yyyy/MM/dd HH:mm:ss"
          placeholder="2000/31/12 23:59:59"
          on:select={(e) => {
            filter.date_start = e.detail;
            // Fri May 17 2024 09:35:55 GMT+0300 (Arabian Standard Time)
          }}
        />
        <h3>Filter date end:</h3>
        <DateInput
          format="yyyy/MM/dd HH:mm:ss"
          placeholder="2000/31/12 23:59:59"
          on:select={(e) => {
            filter.date_end = e.detail;
            // Fri May 17 2024 09:35:55 GMT+0300 (Arabian Standard Time)
          }}
        />
      </div>
      <div class="dash-table-container" style="margin-top: 20px;">
        <div class="better-header">
          <h1>ID</h1>
          <h1>Name</h1>
          <h1>Role</h1>
          <h1>Balance</h1>
          <h1>Standings</h1>
          <h1>Created on</h1>
          <h1>Created by</h1>
          <h1>Actions</h1>
        </div>
        {#each displayUsers as user}
          <div class="better-rows">
            <h1>{user.ID}</h1>
            <h1>{user.Username}</h1>
            <h1>{user.Role}</h1>
            <h1>${user.Balance}</h1>
            <h1 class="standings">
              <span class="lost">197</span>
              <span class="won">212</span>
              <span class="sum">+15</span>
            </h1>
            <h1>{user.CreatedAt}</h1>
            <h1>{user.CreatedBy}</h1>
            <div>
              <a href="/dashboard/users/{user.ID}" class="edits">Edit user</a>
              <a href="#" class="suspends">Suspend user</a>
              <a href="#" class="adds">Add balance</a>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <ModalContainer isOpen={creating_user.isOpen} closeModal={creating_user.closeModal}>
      <div class="modal-for-edits">
        <h1>Creating a user</h1>
        <h2 style="margin-bottom: 1rem;">
          Please fill the details below
        </h2>
  
        <div class="modal-column">
          <h3>Username</h3>
          <input
            type="text"
            placeholder="Username"
            bind:value={creating_user.input_details.username}
          />
        </div>
        <div class="modal-column">
          <h3>Password</h3>
          <input
            type="text"
            placeholder="Password"
            bind:value={creating_user.input_details.password}
          />
        </div>
        <div class="modal-column">
          <h3>Role</h3>
          <Select
            items={collection}
            placeholder="Role"
            listAutoWidth={true}
            value={creating_user.input_details.role}
            on:input={(e) => {
              creating_user.input_details.role = e.detail.value;
            }}
          />
        </div>
        <div class="modal-column">
          <h3>Balance</h3>
          <input
            type="number"
            placeholder="Balance"
            bind:value={creating_user.input_details.balance}
          />
        </div>
        <div class="admin-h">
          <a href="#" class="adds" on:click|preventDefault={() => creating_user.create()}>Save</a>
        </div>
      </div>
    </ModalContainer>
  </main>
</div>
