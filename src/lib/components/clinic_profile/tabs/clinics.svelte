<script lang="ts">
    import ClinicListTile from "$lib/components/clinics/list_tile/ClinicListTile.svelte";
    import ClinicListTileSkeleton from "$lib/components/clinics/list_tile/ClinicListTileSkeleton.svelte";
    import { Api } from "$lib/utils/api";
    import type { Clinic } from "../../../models/clinic";
    import { onMount } from "svelte";

    let clinics: Clinic[] = [];

    onMount(async () => {
        try {
            clinics = await Api.requestBody<Clinic[]>("GET", "clinics");
            return clinics;
        } catch (error) {
            console.log(error);
        }
    });
</script>

<div
    class="grid xxs:grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
>
    {#each clinics as clinic}
        <ClinicListTile {clinic} />
    {:else}
        {#each { length: 30 } as _}
            <ClinicListTileSkeleton />
        {/each}
    {/each}
</div>
