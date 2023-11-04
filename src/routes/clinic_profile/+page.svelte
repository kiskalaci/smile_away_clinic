<script lang="ts">
  import CreatePriceList from "$lib/components/clinics/CreatePriceList.svelte";
  import ClinicList from "$lib/components/clinics/ClinicList.svelte";
  import Equipments from "$lib/components/clinics/Equipments.svelte";
  import Languages from "$lib/components/clinics/Languages.svelte";
  import Specialties from "$lib/components/clinics/Specialties.svelte";
  import LL from "$lib/i18n/i18n-svelte";
  let tabs = [
    $LL.Clinics(),
    "Doctors",
    "Equipments",
    $LL.Specialities(),
    $LL.Languages(),
    $LL.PriceList(),
  ];
  let index: number = 0;
</script>

<div class="flex w-full h-full">
  <div class="w-min h-full border-r-2 border-gray-300 p-4">
    {#each tabs as tab, i}
      <button
        type="button"
        class="p-2 my-1 hover:bg-gray-200 hover:text-gray-600 rounded-md w-full text-left {index ==
        i
          ? 'bg-blue-600 text-white'
          : ''}"
        on:click={() => {
          index = i;
        }}
      >
        {tab}
      </button>
    {/each}
  </div>
  <div class="p-6 w-full h-full">
    {#if index == 0}
      <ClinicList />
    {:else if index == 1}
      Doctors
    {:else if index == 2}
      <Equipments />
    {:else if index == 3}
      <Specialties />
    {:else if index == 4}
      <Languages />
    {:else if index == 5}
      <CreatePriceList />
    {:else}
      <label for={index.toString()}>body:{index}</label>
    {/if}
  </div>
</div>
