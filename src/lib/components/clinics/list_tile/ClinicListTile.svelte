<script lang="ts">
  import Image from "$lib/components/Image.svelte";
  import { onMount } from "svelte";
  import { notEmpty } from "$lib/utils/list_filter";
  import errorImage from "$lib/images/error_image.png";
  import type { Clinic } from "$lib/models/clinic";
  export let clinic: Clinic;

  const languages = ["hu", "de", "en"];
  let urls: string[] = [];
  let favorite = false;
  let show = "hidden";
  let index = 0;

  function changeSlide(e: Event, n: number) {
    e.preventDefault();
    const desiredIndex: number = n + index;
    if (desiredIndex < 0 || desiredIndex >= urls.length) {
      return;
    }
    index = desiredIndex;
  }

  function toggle(e: Event) {
    e.preventDefault();
    favorite = !favorite;
  }

  function handleMouseOver() {
    show = "";
  }

  function handleMouseOut() {
    show = "hidden";
  }

  onMount(async () => {
    try {
      urls = [clinic.image_url, clinic.background_url, clinic.avatar_url];
      urls = urls.filter(notEmpty);
    } catch (error) {}
  });
</script>

<div
  class="relative transition ease-in-out rounded-lg bg-white shadow-sm dark:bg-neutral-700 hover:scale-102"
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOut}
  on:focus={handleMouseOver}
  on:blur={handleMouseOut}
>
  <a href="/clinics/{clinic.id}">
    <div class="relative aspect-square">
      <button type="button" class=" absolute top-4 right-4" on:click={toggle}>
        {#if favorite}
          <i class="fa-solid fa-heart fa-xl text-red-500" />
        {:else}
          <i class="fa-regular fa-heart fa-xl text-gray-400" />
        {/if}
      </button>

      {#each urls as url, i}
        <Image
          src={url}
          alt="background image"
          cssClass="list_tile_background rounded-t-lg {index == i
            ? ''
            : 'hidden'}"
        />
      {:else}
        <img
          class="list_tile_background rounded-t-lg"
          src={errorImage}
          alt="error background"
        />
      {/each}
      <div class="absolute top-1/2 left-2">
        <button
          on:click={(e) => changeSlide(e, -1)}
          class="{show} rounded-lg bg-gray-400 bg-opacity-75 p-2"
        >
          <i class="fa-solid fa-arrow-left fa-lg text-white" />
        </button>
      </div>
      <div class="absolute top-1/2 right-2">
        <button
          on:click={(e) => changeSlide(e, 1)}
          class="{show} rounded-lg bg-gray-400 bg-opacity-75 p-2"
        >
          <i class="fa-solid fa-arrow-right fa-lg text-white 0" />
        </button>
      </div>
    </div>
    <div class="p-4">
      <p class="text-base font-medium text-neutral-600 dark:text-neutral-200">
        {clinic.name}
      </p>

      <p class="text-base font-light text-neutral-600 dark:text-neutral-200">
        {clinic.address}
      </p>
      <div class="flex mt-1">
        {#each languages as lang}
          <div class="rounded bg-gray-100 pr-2 pl-2 mr-2 font-sans text-sm">
            <span>{lang}</span>
          </div>
        {/each}
      </div>
    </div>
  </a>
</div>

<style>
  a {
    color: inherit;
    text-decoration: none;
  }
</style>
