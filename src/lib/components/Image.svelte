<script lang="ts">
  import errorImage from "$lib/images/error_image.png";
  export let src: string;
  export let alt: string;
  export let cssClass: string = "";
</script>

{#if src == null || src == ""}
  <img class={cssClass} src={errorImage} alt="error background" />
{:else}
  <img class="{cssClass}" {src} {alt} />
{/if}
