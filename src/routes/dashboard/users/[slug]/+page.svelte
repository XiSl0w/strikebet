<script>
  export let data;
  import Select from "svelte-select";
  import DashNav from "$lib/components/dash_nav.svelte";
  import { onMount } from "svelte";
  import { AuthActions } from "$lib/store/auth.js";
  import { addToast } from "$lib/store/toastStore.js";
  let collection = [
    { value: "admin", label: "Admins" },
    { value: "seller", label: "Sellers" },
    { value: "user", label: "Users" },
  ];
  let user_details = {
    Balance: 0,
    CreatedAt: "Unknown",
    CreatedBy: null,
    ID: -1,
    Password: "",
    Role: "",
    Suspended: 0,
    Username: "Loading...",
  };

  onMount(async () => {
    const res = await fetch(`http://127.0.0.1:3220/users/${data?.user_id}`, {
      method: "GET",
      headers: AuthActions.getAuthHeader(),
    });
    if (res.ok) {
      user_details = await res.json();
      addToast("success", "Fetched user successfully");
    } else {
      addToast("error", "Failed to fetch user details");
    }
  });

  async function Edit() {
    const res = await fetch("http://127.0.0.1:3220/users/edit", {
      method: "POST",
      headers: AuthActions.getAuthHeader(),
      body: JSON.stringify(user_details),
    });
    if (res.ok) {
      addToast("success", "User updated successfully");
    } else {
      addToast("error", "Failed to update user");
    }
  }
</script>

<div class="dash-container">
  <DashNav />
  <main class="dashboard">
    <div class="modal-for-edits">
      <h1>{user_details?.Username}</h1>
      <h2 style="margin-bottom: 1rem;">
        Created at - {user_details?.CreatedAt}
      </h2>

      <div class="modal-column">
        <h3>Username</h3>
        <input
          type="text"
          placeholder="Username"
          bind:value={user_details.Username}
        />
      </div>
      <div class="modal-column">
        <h3>Password</h3>
        <input
          type="text"
          placeholder="Password"
          bind:value={user_details.Password}
        />
      </div>
      <div class="modal-column">
        <h3>Role</h3>
        <Select
          items={collection}
          placeholder="Role"
          listAutoWidth={true}
          value={user_details.Role}
          on:input={(e) => {
            user_details.Role = e.detail.value;
          }}
        />
      </div>
      <div class="modal-column">
        <h3>Balance</h3>
        <input
          type="number"
          placeholder="Balance"
          bind:value={user_details.Balance}
        />
      </div>
      <div class="modal-column">
        <h3>Suspended</h3>
        <Select
          items={[
            { value: 0, label: "No" },
            { value: 1, label: "Yes" },
          ]}
          placeholder="Suspended"
          listAutoWidth={true}
          value={user_details.Suspended.toString()}
          on:input={(e) => {
            user_details.Suspended = parseInt(e.detail.value);
          }}
        />
      </div>
      <div class="admin-h">
        <a href="#" class="adds" on:click|preventDefault={() => Edit()}>Save</a>
      </div>
    </div>
  </main>
</div>
