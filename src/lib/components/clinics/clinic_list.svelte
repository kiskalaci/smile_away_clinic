<script lang="ts">
    import ClinicListTile from "$lib/components/clinics/list_tile/ClinicListTile.svelte";
    import ClinicListTileSkeleton from "$lib/components/clinics/list_tile/ClinicListTileSkeleton.svelte";
    import { Api } from "$lib/utils/api";
    import type { Clinic } from "../../models/clinic";
    import { onMount } from "svelte";

    let clinics: Clinic[] = [];
    let fetchingClinics: boolean = true;

    async function fetchClinics() {
        fetchingClinics = true;
        try {
            clinics = await Api.requestBody<Clinic[]>("GET", "clinics");
        } catch (error) {
            console.log(error);
        }
        fetchingClinics = false;
    }

    onMount(async () => {
        await fetchClinics();
    });
</script>

<div
    class="grid xxs:grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
>
    {#if fetchingClinics}
        {#each { length: 30 } as _}
            <ClinicListTileSkeleton />
        {/each}
    {:else}
        {#each clinics as clinic}
            <ClinicListTile {clinic} />
        {:else}
            <div>no items</div>
        {/each}
    {/if}
</div>
