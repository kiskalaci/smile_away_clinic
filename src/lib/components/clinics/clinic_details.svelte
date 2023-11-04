<script lang="ts">
    import { Api } from "$lib/utils/api";
    import type { Clinic } from "../../models/clinic";
    import { onMount } from "svelte";
    import Specialties from "./specialties.svelte";
    import Equipments from "./equipments.svelte";
    import Languages from "./languages.svelte";
    export let clinic_id: string = "";
    let clinic: Clinic;
    let fetching: boolean = true;

    async function fetchDetails() {
        fetching = true;
        try {
            clinic = await Api.requestBody<Clinic>(
                "GET",
                `clinics/${clinic_id}`
            );
        } catch (error) {
            console.log(error);
        }
        fetching = false;
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
