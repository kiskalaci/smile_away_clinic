<script lang="ts">
    import type { Equipment } from "$lib/models/equipment";
    import { Api } from "$lib/utils/api";
    import { Toggle } from "flowbite-svelte";
    import { onMount } from "svelte";

    let equipments: Equipment[] = [];
    let fetching: boolean = true;

    async function fetch() {
        fetching = true;
        try {
            equipments = await Api.requestBody<Equipment[]>(
                "GET",
                "dental_equipments"
            );
        } catch (error) {
            console.log(error);
        }
        fetching = false;
    }

    onMount(async () => {
        await fetch();
    });
</script>

<section class="w-full h-full flex justify-center items-center">
    {#each equipments as eq}
        <Toggle checked={eq.selected} size="large">{eq.name}</Toggle>
    {:else}
        <div>no items to display</div>
    {/each}
</section>
