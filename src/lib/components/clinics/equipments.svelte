<script lang="ts">
    import { PageMode, canEdit } from "$lib/enums/page_mode";
    import type { Equipment } from "$lib/models/equipment";
    import { Api } from "$lib/utils/api";
    import { Button } from "flowbite-svelte";
    import { onMount } from "svelte";
    import Divider from "../Divider.svelte";
    import Toggle from "../Toggle.svelte";

    let pageMode = PageMode.view;
    let equipments: Equipment[] = [];
    let fetching = true;

    function toggle() {
        pageMode = pageMode == PageMode.edit ? PageMode.view : PageMode.edit;
    }

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

<div class="flex items-center justify-between">
    <h2 class="font-normal text-xl">Equipments</h2>
    {#if canEdit(pageMode)}
        <div>
            <Button on:click={toggle}>
                <i class="fa-solid fa-xmark text-white pr-2" />
                Cancel
            </Button>
            <Button color="green">
                <i class="fa-regular fa-floppy-disk text-white pr-2" />
                Save
            </Button>
        </div>
    {:else}
        <Button on:click={toggle}>
            <i class="fa-solid fa-pen-to-square text-white pr-2" />
            Edit
        </Button>
    {/if}
</div>
<Divider />
<div
    class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-2"
>
    {#each equipments as eq}
        <div class="bg-white rounded-md">
            <Toggle label={eq.name} disabled={!canEdit(pageMode)} />
        </div>
    {:else}
        <div>no items to display</div>
    {/each}
</div>
