<script lang="ts">
  import type { price_list_skeleton } from "$/lib/models/price_list_skeleton";
  import { PageMode, canEdit } from "$lib/enums/page_mode";
  import LL from "$lib/i18n/i18n-svelte";
  import doge from "$lib/images/empty_doge.png";
  import sadFace from "$lib/images/sad_face.png";
  import { Api } from "$lib/utils/api";
  import { Button, Spinner } from "flowbite-svelte";
  import Divider from "../Divider.svelte";
  import SectionMessage from "../SectionMessage.svelte";
  import Toggle from "../Toggle.svelte";

  let pageMode: PageMode = PageMode.view;
  let skeleton: price_list_skeleton;

  function toggle() {
    pageMode = pageMode == PageMode.edit ? PageMode.view : PageMode.edit;
  }

  async function getSkeleton(): Promise<price_list_skeleton> {
    const skeleton = await Api.requestBody<price_list_skeleton>(
      "GET",
      "price_list_skeleton"
    );
    return skeleton;
  }

  let request = getSkeleton();

  function refetch() {
    request = getSkeleton();
  }
</script>

<div class="flex items-center justify-between">
  <h2 class="font-normal text-xl">{$LL.PriceList()}</h2>
  {#if canEdit(pageMode)}
    <div>
      <Button on:click={toggle}>
        <i class="fa-solid fa-xmark text-white pr-2" />
        {$LL.Cancel()}
      </Button>
      <Button color="green">
        <i class="fa-regular fa-floppy-disk text-white pr-2" />
        {$LL.Save()}
      </Button>
    </div>
  {:else}
    <Button on:click={toggle}>
      <i class="fa-solid fa-pen-to-square text-white pr-2" />
      {$LL.Edit()}
    </Button>
  {/if}
</div>
<Divider />
{#await request}
  <div class="flex justify-center content-center w-full">
    <div>
      <Spinner size="10" color="blue" />
      {$LL.Loading()}
    </div>
  </div>
{:then result}
  {#if result && result.categories.length}
    <div
      class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-2"
    >
      {#each result.categories as category (category.id)}
        <div class="bg-white rounded-md">
          <Toggle
            label={category.category_name}
            disabled={!canEdit(pageMode)}
          />
        </div>
      {/each}
    </div>
  {:else}
    <div>
      <SectionMessage
        imageUrl={doge}
        imageAlt="empty_search_result"
        message={$LL.EmptyResult()}
        buttonLabel={$LL.Retry()}
        buttonOnClick={refetch}
      />
    </div>
  {/if}
{:catch error}
  <SectionMessage
    imageUrl={sadFace}
    imageAlt="sad_face"
    message="{$LL.SomethingWentWrong()} ..."
    buttonLabel={$LL.Retry()}
    buttonOnClick={refetch}
  />
{/await}
