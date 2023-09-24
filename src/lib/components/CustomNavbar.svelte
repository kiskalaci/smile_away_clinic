<script lang="ts">
  import { page } from "$app/stores";
  import { LL } from "$lib/i18n/i18n-svelte";
  import logo from "$lib/images/logo_h.png";
  import {
    Avatar,
    NavBrand,
    NavHamburger,
    NavLi,
    NavUl,
    Navbar,
  } from "flowbite-svelte";
  import AccountBadgeDropDown from "./AccountBadgeDropDown.svelte";
  import LanguageSelectModal from "./modals/LanguageSelectModal.svelte";

  let showLanguageSelectModal: boolean = false;
</script>

<Navbar let:hidden let:toggle color="light" navClass="shadow-md py-2">
  <NavBrand href="/">
    <img src={logo} class="mr-3 h-6 sm:h-9" alt="DentMe Logo" />
  </NavBrand>
  <div class="flex items-center md:order-2">
    <Avatar id="avatar-menu" border />
    <NavHamburger
      on:click={toggle}
      class1="w-full md:flex md:w-auto md:order-1"
    />
  </div>
  <AccountBadgeDropDown />
  <NavUl {hidden}>
    <NavLi href="/" active={$page.url.href.endsWith("/")}>{$LL.Home()}</NavLi>
    <NavLi
      href="/clinic_profile"
      active={$page.url.href.endsWith("/clinic_profile")}
      >{$LL.Clinic()} {$LL.Settings().toLowerCase()}</NavLi
    >

    <NavLi on:click={() => (showLanguageSelectModal = true)}>
      <div class="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <span> {$LL.Languages()}</span>
      </div>
    </NavLi>
  </NavUl>
</Navbar>
<LanguageSelectModal bind:showLanguageSelectModal />
