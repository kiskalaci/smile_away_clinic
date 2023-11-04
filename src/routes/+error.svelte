<script lang="ts">
  import { page } from "$app/stores";
  import Image from "$lib/components/Image.svelte";
  import { LL } from "$lib/i18n/i18n-svelte";
  import notFound from "$lib/images/404.png";
  import sadFace from "$lib/images/sad_face.png";
</script>

<div class="flex w-full h-full justify-center content-center">
  <div class="min-w-max h-min text-center align-middle">
    {#if $page.status == 404}
      <Image alt="page_not_found" cssClass="w-80" src={notFound} />
    {:else}
      <Image alt="page_not_found" cssClass="w-80" src={sadFace} />
    {/if}
    {$LL.SomethingWentWrong()} ...
  </div>
</div>
