<script lang="ts">
  import LL from "$lib/i18n/i18n-svelte";
  import { Modal, Tabs, TabItem } from "flowbite-svelte";
    import LanguageSelect from "../lang/LanguageSelect.svelte";
  export let showLanguageSelectModal = false;
</script>

<Modal
  title="{$LL.Languages()} & {$LL.Currency()}"
  bind:open={showLanguageSelectModal}
  size="md"
>
  <Tabs
    style="full"
    defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
  >
    <TabItem class="w-full" open>
      <span slot="title">{$LL.Languages()}</span>
      <LanguageSelect />
    </TabItem>
    <TabItem class="w-full">
      <span slot="title">{$LL.Currency()}</span>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>{$LL.Dashboard()}:</b> Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
  </Tabs>
</Modal>
