<script lang="ts">
  import { Radio } from "flowbite-svelte";
  export let onChange: (e: Event) => void;
  export let countryCode: string;
  export let name: string;
</script>

<Radio name="custom" on:change={onChange} value={countryCode} custom>
  <div
    class="p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <div class="w-full">{name}</div>
  </div>
</Radio>
