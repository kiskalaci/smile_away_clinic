<script lang="ts">
  import { dismissToast, toasts } from "$lib/stores/toast_store";
  import ToastMessage from "./ToastMessage.svelte";
</script>

{#if $toasts}
  <section class="fixed bottom-5 right-5 flex-col-reverse z-50">
    {#each $toasts as toast (toast.id)}
      <ToastMessage on:dismiss={() => dismissToast(toast.id)} config={toast} />
    {/each}
  </section>
{/if}
