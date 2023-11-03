<script lang="ts">
    export let imageUrl: Optional<string> = undefined;
    export let imageAlt: string = "";
    export let message: Optional<string> = undefined;
    export let description: Optional<string> = undefined;
    export let buttonLabel: Optional<string> = undefined;
    export let buttonOnClick: Optional<Function> = undefined;
    export let buttonIconClass: Optional<string> = "fa-solid fa-arrows-rotate";

    import Image from "$lib/components/Image.svelte";
    import { Button } from "flowbite-svelte";
</script>

<div
    class=" w-full flex rounded-lg border-2 border-dashed border-gray-200 justify-center content-center p-4"
>
    <div class="block">
        {#if imageUrl}
            <Image alt={imageAlt} src={imageUrl} />
        {/if}
        {#if message}
            <p class="text-center">
                {message}
            </p>
        {/if}
        {#if description}
            <p class="text-center pt-2">
                {description}
            </p>
        {/if}
        {#if buttonLabel && buttonOnClick}
            <div class="flex content-center justify-center pt-2">
                <Button on:click={buttonOnClick()}>
                    {#if buttonIconClass}
                        <i class="{buttonIconClass} pr-2" />
                    {/if}
                    {buttonLabel}</Button
                >
            </div>
        {/if}
    </div>
</div>
