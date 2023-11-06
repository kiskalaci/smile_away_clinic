<script lang="ts">
  export let label: string = "";
  export let disabled: boolean = false;
  export let value: boolean;
</script>

<label
  class=" p-4 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center"
>
  <div class="relative">
    <div class="flex">
      <input
        on:change
        type="checkbox"
        bind:checked={value}
        class="sr-only peer"
        {disabled}
      />
      <div
        class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 {disabled
          ? 'peer-checked:bg-blue-400'
          : 'peer-checked:bg-blue-600'}"
      />
      <span
        class="ml-3 text-lg font-normal font-sans {disabled
          ? 'text-gray-700'
          : 'text-gray-900'} dark:text-gray-300">{label}</span
      >
    </div>
  </div>
</label>
