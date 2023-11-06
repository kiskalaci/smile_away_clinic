<script lang="ts">
  import { canEdit, PageMode } from "$lib/enums/page_mode";
  import LL from "$lib/i18n/i18n-svelte";
  import doge from "$lib/images/empty_doge.png";
  import sadFace from "$lib/images/sad_face.png";
  import { getFlagFromLocale, type Language } from "$lib/models/language";
  import { selectedClinicId } from "$lib/stores/selected_clinic";
  import { addToast } from "$lib/stores/toast_store";
  import { Api } from "$lib/utils/api";
  import { Button, Spinner } from "flowbite-svelte";
  import Divider from "../Divider.svelte";
  import Toggle from "../form_inputs/Toggle.svelte";
  import SectionMessage from "../SectionMessage.svelte";

  let pageMode = PageMode.view;
  let formDirty = false;
  let languages: Language[] = [];

  function selectedIds(): number[] {
    let ids: number[] = [];
    if (!languages || languages.length == 0) {
      return ids;
    }
    ids = languages.filter((lang) => lang.is_selected).map((i) => i.id);
    return ids;
  }

  let request = getLanguages();

  function toggle() {
    pageMode = pageMode == PageMode.edit ? PageMode.view : PageMode.edit;
  }

  function cancel() {
    pageMode = PageMode.view;
    if (formDirty) {
      refetch();
      formDirty = false;
    }
  }

  function refetch() {
    request = getLanguages();
  }

  async function getLanguages(): Promise<Language[]> {
    languages = await Api.requestBody<Language[]>(
      "GET",
      `clinics/${$selectedClinicId}/languages`,
    );
    return languages;
  }

  async function saveChanges(): Promise<void> {
    let ids = selectedIds();
    const data = {
      clinic: {
        languages: ids,
      },
    };
    console.log(data);
    try {
      await Api.request(
        "POST",
        `clinics/${$selectedClinicId}/add_or_update_languages`,
        data,
      );
      addToast({
        type: "success",
        message: $LL.SuccesfulOperation(),
      });
    } catch (error) {
      addToast({
        type: "error",
        message: $LL.SomethingWentWrong(),
      });
    }
    refetch();
    pageMode = PageMode.view;
  }
</script>

<div class="flex items-center justify-between">
  <h2 class="font-normal text-xl">{$LL.Languages()}</h2>
  {#if canEdit(pageMode)}
    <div>
      <Button on:click={cancel}>
        <i class="fa-solid fa-xmark text-white pr-2" />
        {$LL.Cancel()}
      </Button>
      <Button color="green" on:click={saveChanges}>
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
{:then array}
  {#if array && array.length}
    <div
      class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-2"
    >
      {#each array as lang (lang.id)}
        <div class="flex bg-white rounded-md">
          <Toggle
            on:change={() => (formDirty = true)}
            label="{lang.name} {getFlagFromLocale(lang.name)}"
            disabled={!canEdit(pageMode)}
            bind:value={lang.is_selected}
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
