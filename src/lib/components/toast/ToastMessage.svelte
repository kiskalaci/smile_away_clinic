<script lang="ts">
  import type { ToastDetails } from "$lib/stores/toast_store";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
  export let config: ToastDetails;
  export let dismissible = true;
</script>

<article
  class="flex items-center p-2 m-2 w-96 z-50 bg-white rounded-md shadow-md"
  role="alert"
  transition:fade
>
  <div class="flex w-full">
    {#if config.type == "success"}
      <div class="mx-2 py-1 px-2 rounded-md bg-green-100">
        <i class="fa-solid fa-check text-green-500" />
      </div>
    {:else if config.type == "error"}
      <div class="mx-2 py-1 px-4 rounded-md bg-red-100">
        <i class="fa-solid fa-exclamation text-red-500" />
      </div>
    {:else}
      <div class="mx-2 py-1 px-4 rounded-md bg-blue-100">
        <i class="fa-solid fa-info text-blue-500" />
      </div>
    {/if}
    <p>
      {config.message}
    </p>
  </div>
  {#if dismissible}
    <button
      class="py-1 px-2 m-2 rounded-md hover:bg-gray-100"
      on:click={() => dispatch("dismiss")}
    >
      <i class="fa-solid fa-xmark" />
    </button>
  {/if}
</article>
