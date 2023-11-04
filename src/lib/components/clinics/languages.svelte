<script lang="ts">
    import { Api } from "$lib/utils/api";
    import { Button, Spinner } from "flowbite-svelte";
    import Divider from "../Divider.svelte";
    import { PageMode, canEdit } from "$lib/enums/page_mode";
    import LL from "$lib/i18n/i18n-svelte";
    import Toggle from "../Toggle.svelte";
    import SectionMessage from "../SectionMessage.svelte";
    import sadFace from "$lib/images/sad_face.png";
    import doge from "$lib/images/empty_doge.png";
    import type { Language } from "$lib/models/language";

    let pageMode: PageMode = PageMode.view;
    let showButtons: boolean = true;
    let languages: Language[] = [];

    function toggle() {
        pageMode = pageMode == PageMode.edit ? PageMode.view : PageMode.edit;
    }

    async function getlanguages(): Promise<Language[]> {
        try {
            // var random_boolean = Math.random() < 0.5;
            // if (random_boolean) {
            //     languages = [];
            //     return languages;
            // }

            const json = await Api.requestBody<Map<string, number>>(
                "GET",
                "languages"
            );
            languages = [];
            // for (var i in json) {
            //     const item = new Language(
            //         json[i],
            //         i,
            //         Language.getFlagFromLocale(i),
            //         ""
            //     );
            //     languages.push(item);
            // }
            languages = languages;
            return languages;
        } catch (error) {
            showButtons = false;
            throw error;
        }
    }

    let request = getlanguages();

    function refetch() {
        showButtons = true;
        request = getlanguages();
    }
</script>

<div class="flex items-center justify-between">
    <h2 class="font-normal text-xl">{$LL.Languages()}</h2>
    {#if showButtons}
        {#if canEdit(pageMode)}
            <div>
                <Button on:click={toggle}>
                    <i class="fa-solid fa-xmark text-white pr-2" />
                    {$LL.Cancel()}
                </Button>
                <Button color="green">
                    <i class="fa-regular fa-floppy-disk text-white pr-2" />
                    {$LL.Save()}
                </Button>
            </div>
        {:else}
            <Button on:click={toggle}>
                <i class="fa-solid fa-pen-to-square text-white pr-2" />
                {$LL.Edit()}
            </Button>
        {/if}
    {/if}
</div>
<Divider />
{#await request}
    <div class="flex justify-center content-center w-full">
        <div>
            <Spinner size="10" color="blue" />
            {$LL.Loading()}
        </div>
    </div>
{:then array}
    {#if array && array.length}
        <div
            class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-2"
        >
            {#each array as lang (lang.id)}
                <div class="bg-white rounded-md">
                    <Toggle
                        label="{lang.name} {lang.flag}"
                        disabled={!canEdit(pageMode)}
                    />
                </div>
            {/each}
        </div>
    {:else}
        <div>
            <SectionMessage
                imageUrl={doge}
                imageAlt="empty_search_result"
                message={$LL.EmptyResult()}
                buttonLabel={$LL.Retry()}
                buttonOnClick={refetch}
            />
        </div>
    {/if}
{:catch error}
    <SectionMessage
        imageUrl={sadFace}
        imageAlt="sad_face"
        message="{$LL.SomethingWentWrong()} ..."
        buttonLabel={$LL.Retry()}
        buttonOnClick={refetch}
    />
{/await}
