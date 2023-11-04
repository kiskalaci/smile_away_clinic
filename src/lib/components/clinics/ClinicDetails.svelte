<script lang="ts">
  import { Api } from "$lib/utils/api";
  import type { Clinic } from "../../models/clinic";
  import { onMount } from "svelte";
  import Equipments from "./Equipments.svelte";
  import Specialties from "./Specialties.svelte";
  import Languages from "./Languages.svelte";
  export let clinic_id: string = "";
  let clinic: Clinic;

  async function fetchDetails() {
    try {
      clinic = await Api.requestBody<Clinic>("GET", `clinics/${clinic_id}`);
    } catch (error) {
      console.log(error);
    }
  }

  onMount(async () => {
    await fetchDetails();
  });
</script>

<div class="p-6">
  <Specialties />
  <Equipments />
  <Languages />
</div>
