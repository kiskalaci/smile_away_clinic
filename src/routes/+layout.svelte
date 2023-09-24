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

<div class="app bg-gray-50">
  <main>
    <CustomNavbar />
    <div class="w-full p-6">
      <slot />
    </div>
  </main>

  <footer>
    <p>
      visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
    </p>
  </footer>
</div>
