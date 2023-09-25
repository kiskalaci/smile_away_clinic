<script lang="ts">
    import { page } from "$app/stores";
    import ClinicDetails from "$lib/components/clinics/clinic_details.svelte";

    let id = parseInt($page.params.id);
</script>

<ClinicDetails clinic_id={id.toString()} />
