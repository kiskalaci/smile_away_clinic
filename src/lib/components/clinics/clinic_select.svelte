<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    import type { Clinic } from "$lib/models/clinic";
    import { Api } from "$lib/utils/api";

    import { onMount } from "svelte";

    let clinics: Clinic[] = [];
    let fetchingClinics: boolean = true;
    import background from "$lib/images/texture_bg.jpg";
    import { setClinicId } from "$lib/stores/selected_clinic";

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

<div class="flex w-full h-full justify-between">
    <div class="p-4">
        <h2 class="w-full text-left p-6 font-medium text-lg">
            Select your clinic
        </h2>

        {#each clinics as clinic}
            <button
                on:click={() => {
                    setClinicId(clinic.id.toString());
                }}
                class="w-full text-left p-6 m-2 bg-white rounded-md hover:bg-gray-100 active:bg-gray-200 focus:ring"
            >
                {clinic.name}
            </button>
        {/each}
    </div>

    <div class="w-0 md:w-full h-full">
        <Image
            src={background}
            alt="background image"
            cssClass="object-cover w-full h-full"
        />
    </div>
</div>
