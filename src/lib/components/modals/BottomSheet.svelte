<!-- if you're not using typescript, remove lang="ts" attribute from the script tag -->
<script context="module" lang="ts">
  // for passing focus on to the next Modal in the queue.
  // A module context level object is shared among all its component instances. [Read More Here](https://svelte.dev/tutorial/sharing-code)
  const modalList: HTMLElement[] = [];
</script>

<script lang="ts">
  import { getContext } from "svelte";
  import { quintOut } from "svelte/easing";
  import type { Writable } from "svelte/store";
  import { fade, slide } from "svelte/transition";

  export let content: ConstructorOfATypedSvelteComponent;

  let ctx = getContext<{
    show: (content: ConstructorOfATypedSvelteComponent) => void;
    hide: () => void;
    visible: Writable<boolean>;
  }>("bottom_sheet");

  let { hide } = ctx;

  function onKeyDown(e: KeyboardEvent) {
    e.stopPropagation();
    switch (e.key) {
      case "Escape":
        hide();
        break;
    }
  }
  function transitionend(e: TransitionEvent) {
    const node = e.target as HTMLElement;
    node.focus();
  }
  function modalAction(node: HTMLElement) {
    const returnFn: any[] = [];
    // for accessibility
    if (document.body.style.overflow !== "hidden") {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      returnFn.push(() => {
        document.body.style.overflow = original;
      });
    }
    node.addEventListener("keydown", onKeyDown);
    node.addEventListener("transitionend", transitionend);
    node.focus();
    modalList.push(node);
    returnFn.push(() => {
      node.removeEventListener("keydown", onKeyDown);
      node.removeEventListener("transitionend", transitionend);
      modalList.pop();
      // Optional chaining to guard against empty array.
      modalList[modalList.length - 1]?.focus();
    });
    return {
      destroy: () => returnFn.forEach((fn) => fn()),
    };
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  on:click={() => hide()}
  on:keydown={(e) => onKeyDown(e)}
  use:modalAction
  tabindex="0"
  class="w-full h-full bg-gray-500 opacity-75 fixed bottom-0 z-20"
  transition:fade={{
    delay: 250,
    duration: 300,
    easing: quintOut,
  }}
/>

<div
  class="p-4 w-full h-96 rounded-t-lg shadow-md bg-white z-50 bottom-0 fixed"
  transition:slide={{
    delay: 250,
    duration: 300,
    easing: quintOut,
    axis: "y",
  }}
>
  <div class="flex justify-end">
    <button class="rounded-full h-8 w-8 bg-gray-400" on:click={() => hide()}
      ><i class="fa-solid fa-xmark text-white" /></button
    >
  </div>
  <svelte:component this={content} />
</div>
