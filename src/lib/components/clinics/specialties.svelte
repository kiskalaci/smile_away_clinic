<script lang="ts">
    import { Specialty } from "$lib/models/specialty";
    import { Api } from "$lib/utils/api";
    import { Toggle } from "flowbite-svelte";
    import { onMount } from "svelte";

    let specialties: Specialty[] = [];
    let fetching: boolean = true;

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

<div />
{#each specialties as sp}
    <div class="bg-white rounded-md p-4 my-2">
        <Toggle checked={sp.selected} size="large">{sp.name}</Toggle>
    </div>
{:else}
    <div>no items to display</div>
{/each}
