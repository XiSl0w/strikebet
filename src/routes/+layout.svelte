<script>
  import { page } from "$app/stores";
  import { AuthActions } from "$lib/store/auth.js";
  import { onMount } from "svelte";
  import { userDetails } from "$lib/store/userDetails.js";
  import ToastContainer from "$lib/components/ToastContainer.svelte";
  import NavigationBar from "$lib/components/navigation_bar.svelte";
  import Footer from "$lib/components/footer.svelte";

  $: currentPage = $page.url.pathname;
  $: mainRoute = currentPage.split("/")[1];

  // onMount(async () => {
  //   if (!AuthActions.checkAuth()) {
  //     if (currentPage !== '/login') {
  //       window.location.href = '/login';
  //     }
  //   }
  //   const success = await userDetails.UpdateDetails();
  //   if (!success) {
  //     AuthActions.clearToken();
  //     if (currentPage !== '/login') {
  //       window.location.href = '/login';
  //     }
  //   }
  // });
</script>

<body>
  <ToastContainer />
  {#if currentPage.split("/")[1] !== "dashboard"}
    <NavigationBar currentRoute={mainRoute} />
  {/if}
  <slot />
  {#if currentPage !== "/dashboard"}
    <Footer />
  {/if}
</body>
