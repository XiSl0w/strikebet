<script>
  import BetterHeader from "$lib/components/better_header.svelte";
  import SellerHeader from "$lib/components/seller_header.svelte";
  import Acp from "$lib/components/acp.svelte";
  import Scp from "$lib/components/scp.svelte";
  import Withdrawals from "$lib/components/withdrawals.svelte";
  import UserViewAcp from "$lib/components/user-view-acp.svelte";
  import Select from "svelte-select";

  let collection = [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
  ];

  import {
    DateInput,
    DatePicker,
    localeFromDateFnsLocale,
  } from "date-picker-svelte";
  let date = new Date();
</script>

<div class="dash-container">
  <nav class="dash">
    <h1>STRIKE<span>BET</span></h1>
    <h4>Admin dashboard</h4>
    <a href="#" class="ac-dash">
      <i class="fa-solid fa-user"></i> Users
    </a>
    <a href="#">
      <i class="fa-solid fa-user-tie"></i> Sellers
    </a>
    <a href="#">
      <i class="fa-solid fa-receipt"></i> Withdrawals
    </a>
  </nav>
  <main class="dashboard">

    <div class="full-w">
      <h1 class="dash-t">
        Users
      </h1>
      <div class="dash-table-container">
        <div class="better-header">
          <h1>Player name</h1>
          <h1>Player e-mail</h1>
          <h1>Player standings</h1>
          <h1>Bought balance</h1>
          <h1>Current balance</h1>
          <h1>Actions</h1>
        </div>
        <div class="better-rows">
          <h1>Player name</h1>
          <h1>Player e-mail</h1>
          <h1 class="standings">
            <span class="lost">197</span>
            <span class="won">212</span>
            <span class="sum">+15</span>
          </h1>
          <h1>Bought balance</h1>
          <h1>Current balance</h1>
          <div>
            <a href="#" class="edits">Edit user</a>
            <a href="#" class="suspends">Suspend user</a>
            <a href="#" class="adds">Add balance</a>
          </div>
        </div>
      </div>
    </div>

    <SellerHeader />
    <Acp />
    <Scp />
    <Withdrawals />
    <UserViewAcp />
    <div class="dash-loading">
      <div class="loader"></div>
      Loading contents...
    </div>

    <div class="modal-for-edits">
      <h1>Modal title</h1>
      <h2>Hello, world.</h2>

      <div class="modal-column">
        <h3>Modal column title</h3>
        <input type="text" placeholder="Text goes here" />
      </div>
      <div class="modal-column">
        <h3>Modal select title</h3>
        <Select
          items={collection}
          placeholder="Method"
          multiple
          listAutoWidth={true}
          searchable={false}
        />
      </div>
      <div class="admin-h">
        <a href="#" class="edits">Action1</a>
        <a href="#" class="suspends">Action2</a>
        <a href="#" class="deletes">Action3</a>
        <a href="#" class="blocks">Action4</a>
        <a href="#" class="adds">Action5</a>
        <a href="#" class="percents">Action6</a>
      </div>
    </div>
  </main>
</div>
