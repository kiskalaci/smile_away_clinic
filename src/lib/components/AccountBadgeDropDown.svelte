<script lang="ts">
    import { AuthStatus } from "$lib/enums/auth_status";
    import LL from "$lib/i18n/i18n-svelte";
    import {
        clearClinicId,
        selectedClinicId,
    } from "$lib/stores/selected_clinic";
    import { username } from "$lib/stores/username";
    import { authStatus, logout } from "$lib/utils/auth";
    import {
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
    } from "flowbite-svelte";
</script>

<Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
        <span class="block text-sm"> First Last </span>
        <span class="block truncate text-sm font-medium">{$username} </span>
    </DropdownHeader>

    {#if $selectedClinicId !== ""}
        <DropdownItem on:click={() => clearClinicId()}
            >{$LL.Clinics()}</DropdownItem
        >
    {/if}
    <DropdownItem>{$LL.Settings()}</DropdownItem>
    <DropdownDivider />

    {#if $authStatus == AuthStatus.authenticated}
        <DropdownItem on:click={() => logout()}>
            {$LL.Logout()}</DropdownItem
        >
    {/if}
</Dropdown>
