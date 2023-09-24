<script lang="ts">
    import {
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
    } from "flowbite-svelte";
    import { authStatus, logout } from "$lib/utils/auth";
    import { username } from "$lib/utils/username";
    import LL from "$lib/i18n/i18n-svelte";
    import { SignInModalState } from "$lib/enums/sign_in_modal_state";
    import { AuthStatus } from "$lib/enums/auth_status";
    import SignInOrRegisterModal from "./modals/SignInOrRegisterModal.svelte";

    let showModal: boolean = false;
    let modalState: SignInModalState;

    function _showModal(state: SignInModalState) {
        showModal = true;
        modalState = state;
    }
</script>

<Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
        <span class="block text-sm"> First Last </span>
        <span class="block truncate text-sm font-medium">{$username} </span>
    </DropdownHeader>
    <DropdownItem href="/patients">{$LL.Patients()}</DropdownItem>
    <DropdownItem>{$LL.Settings()}</DropdownItem>
    <DropdownDivider />

    {#if $authStatus == AuthStatus.authenticated}
        <DropdownItem on:click={() => logout()}>
            {$LL.Logout()}</DropdownItem
        >
    {:else}
        <DropdownItem on:click={() => _showModal(SignInModalState.login)}
            >{$LL.Signin()}</DropdownItem
        >
        <DropdownItem on:click={() => _showModal(SignInModalState.register)}
            >{$LL.Signup()}</DropdownItem
        >
    {/if}
</Dropdown>

<SignInOrRegisterModal bind:showModal bind:state={modalState} />
