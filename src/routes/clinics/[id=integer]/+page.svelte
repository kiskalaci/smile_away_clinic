<script lang="ts">
  import { page } from "$app/stores";
  import ClinicDetails from "$lib/components/clinics/ClinicDetails.svelte";

  let id = parseInt($page.params.id);
</script>

<ClinicDetails clinic_id={id.toString()} />
