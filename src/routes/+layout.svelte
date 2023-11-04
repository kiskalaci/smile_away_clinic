<script lang="ts">
  import "../app.css";
  import "../app.postcss";
  import "./styles.css";

  import CustomNavbar from "$lib/components/CustomNavbar.svelte";

  import ClinicSelect from "$lib/components/clinics/ClinicSelect.svelte";
  import SignIn from "$lib/components/SignIn.svelte";
  import { AuthStatus } from "$lib/enums/auth_status";
  import { selectedClinicId } from "$lib/stores/selected_clinic";
  import { authStatus } from "$lib/utils/auth";
  import { Spinner } from "flowbite-svelte";
  import Cookies from "js-cookie";
  import { onMount } from "svelte";
  let loading: boolean = true;
  onMount(() => {
    const token = Cookies.get("auth_token");
    $authStatus = token ? AuthStatus.authenticated : AuthStatus.unauthenticated;
    loading = false;
  });
</script>

<main class="bg-gray-50 h-full">
  {#if $authStatus == AuthStatus.authenticated}
    <CustomNavbar />
    <div class="w-full h-full">
      {#if $selectedClinicId !== ""}
        <slot />
      {:else}
        <ClinicSelect />
      {/if}
    </div>
  {:else}
    <div class="w-full h-full flex justify-center items-center">
      <div
        class="p-6 m-6 bg-white rounded-md shadow-md h-min w-full sm:w-3/4 md:w-2/4 xl:w-1/4"
      >
        {#if !loading}
          <SignIn />
        {:else}
          <div class="text-center"><Spinner /></div>
        {/if}
      </div>
    </div>
  {/if}
</main>
