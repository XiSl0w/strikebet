<script>
  import { userDetails } from "$lib/store/userDetails.js";
  import { AuthActions } from "$lib/store/auth.js";
  import { addToast } from '$lib/store/toastStore.js';
  let amount = 0;

  const withdraw = async () => {
    const response = await fetch(
      "http://127.0.0.1:3220/users/withdrawals/create",
      {
        method: "POST",
        headers: AuthActions.getAuthHeader(),
        body: JSON.stringify({ amount }),
      }
    );
    if (response.ok) {
      await userDetails.UpdateDetails();
      addToast('success', 'Withdraw request sent successfully');
      return;
    }
    let res = await response.json();
    addToast('error', res.message);
  };
</script>

<div class="acc-details">
  <h1>Welcome back, <b>{$userDetails.Username || "User"}</b></h1>
  <div class="help color-invert">
    <h1><i class="fa-solid fa-money-bill"></i> Request Withdraw</h1>
    <h3>Amount</h3>
    <input
      type="number"
      min="0"
      placeholder="Please enter the amount you would like to withdraw here"
      bind:value={amount}
    />
    <h3 class="balance">
      Your maximum withdraw amount is <b>${$userDetails.Balance || 0}</b>
    </h3>
    <a href="#" on:click|preventDefault={withdraw}>Send request</a>
  </div>
</div>