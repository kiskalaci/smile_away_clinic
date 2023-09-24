<script lang="ts">
  import "../app.css";
  import "../app.postcss";
  import "./styles.css";

  import CustomNavbar from "$lib/components/CustomNavbar.svelte";

  import { AuthStatus } from "$lib/enums/auth_status";
  import { authStatus } from "$lib/utils/auth";
  import Cookies from "js-cookie";
  import { onMount } from "svelte";

  onMount(() => {
    const token = Cookies.get("auth_token");
    $authStatus = token ? AuthStatus.authenticated : AuthStatus.unauthenticated;
  });
</script>

<main class="app bg-gray-50 h-full">
  <CustomNavbar />
  <div class="w-full h-full">
    <slot />
  </div>
</main>
