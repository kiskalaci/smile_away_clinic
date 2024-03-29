<script lang="ts">
  import { canEdit, PageMode } from "$lib/enums/page_mode";
  import LL from "$lib/i18n/i18n-svelte";
  import doge from "$lib/images/empty_doge.png";
  import sadFace from "$lib/images/sad_face.png";
  import type { Equipment } from "$lib/models/equipment";
  import { selectedClinicId } from "$lib/stores/selected_clinic";
  import { addToast } from "$lib/stores/toast_store";
  import { Api } from "$lib/utils/api";
  import { Button, Spinner } from "flowbite-svelte";
  import Divider from "../Divider.svelte";
  import Toggle from "../form_inputs/Toggle.svelte";
  import SectionMessage from "../SectionMessage.svelte";

  let pageMode = PageMode.view;
  let formDirty = false;
  let equipments: Equipment[] = [];

  function selectedIds(): number[] {
    let ids: number[] = [];
    if (!equipments || equipments.length == 0) {
      return ids;
    }
    ids = equipments.filter((eq) => eq.is_selected).map((i) => i.id);
    return ids;
  }

  let request = getEquipments();

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
    request = getEquipments();
  }

  async function getEquipments(): Promise<Equipment[]> {
    equipments = await Api.requestBody<Equipment[]>(
      "GET",
      `clinics/${$selectedClinicId}/equipments`,
    );
    return equipments;
  }

  async function saveChanges(): Promise<void> {
    let ids = selectedIds();
    const data = {
      clinic: {
        dental_equipments: ids,
      },
    };
    console.log(data);
    try {
      await Api.request(
        "POST",
        `clinics/${$selectedClinicId}/add_or_update_equipments`,
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
  <h2 class="font-normal text-xl">{$LL.Equipments()}</h2>
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
      {#each array as eq (eq.id)}
        <div class="bg-white rounded-md">
          <Toggle
            on:change={() => (formDirty = true)}
            label={eq.name}
            disabled={!canEdit(pageMode)}
            bind:value={eq.is_selected}
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
