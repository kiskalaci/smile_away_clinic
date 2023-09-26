<script lang="ts">
    import { Specialty } from "$lib/models/specialty";
    import { Api } from "$lib/utils/api";
    import { Button } from "flowbite-svelte";
    import { onMount } from "svelte";
    import Divider from "../Divider.svelte";
    import { PageMode, canEdit } from "$lib/enums/page_mode";
    import LL from "$lib/i18n/i18n-svelte";
    import Toggle from "../Toggle.svelte";

    let pageMode: PageMode = PageMode.view;
    let specialties: Specialty[] = [];
    let fetching: boolean = true;

    function toggle() {
        pageMode = pageMode == PageMode.edit ? PageMode.view : PageMode.edit;
    }

    async function fetch() {
        fetching = true;
        try {
            const json = await Api.requestBody<Map<string, string>[]>(
                "GET",
                "specialties"
            );
            json.forEach(function (item: Map<string, string>) {
                const spec = Specialty.fromJson(item);
                specialties.push(spec);
            });
            specialties = specialties;
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
    <h2 class="font-normal text-xl">Specialities</h2>
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
    {#each specialties as sp}
        <div class="bg-white rounded-md">
            <Toggle label={sp.name} disabled={!canEdit(pageMode)} />
        </div>
    {:else}
        <div>no items to display</div>
    {/each}
</div>
