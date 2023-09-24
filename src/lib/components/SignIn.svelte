<script lang="ts">
    import { goto } from "$app/navigation";
    import { AuthStatus } from "$lib/enums/auth_status";
    import { SignInState } from "$lib/enums/sign_in_state";
    import LL from "$lib/i18n/i18n-svelte";
    import type { User } from "$lib/models/user";
    import { username } from "$lib/stores/username";
    import { Api } from "$lib/utils/api";
    import { authStatus, setTokenCookie } from "$lib/utils/auth";
    import { isEmail, isPassword } from "$lib/utils/validation";
    import {
        Button,
        Checkbox,
        FloatingLabelInput,
        Spinner,
    } from "flowbite-svelte";
    import Cookies from "js-cookie";

    export let state: SignInState = SignInState.login;

    let email: string = "proba@gmail.com";
    let password: string = "Test2020";
    let confirmPassword: string;
    let validationMessage: string;
    let showValidationMessage: boolean;
    let isLoading: boolean = false;

    $: language = Cookies.get("language") ?? "en";
    $: emailValid = isEmail(email);
    $: passwordValid = isPassword(password);
    $: passwordsMatch = password == confirmPassword;
    $: formIsValid =
        (emailValid && passwordValid && state == SignInState.login) ||
        passwordsMatch;
    $: formData = {
        clinic_user: {
            email,
            password,
            password_confirmation: confirmPassword,
            language,
        },
    };

    function _toggleState() {
        if (state == SignInState.login) {
            state = SignInState.register;
        } else {
            state = SignInState.login;
        }
    }

    async function _submit(e: Event) {
        if (state === SignInState.login) {
            _logIn(e);
        } else {
            _register(e);
        }
    }

    async function _logIn(e: Event) {
        try {
            e.preventDefault();

            const data = {
                clinic_user: {
                    email,
                    password,
                },
            };

            if (_isValid() == false) {
                return;
            }
            const res = await Api.request("POST", "clinic_login", data);
            if (res.ok) {
                const token: string | null = res.headers.get("Authorization");
                setTokenCookie(token);
                const user: User = await res.json();
                $username = user.email;
                $authStatus = AuthStatus.authenticated;
            }

            if (res.status === 401) {
                const body = await res.json();
                validationMessage = body.error;
                showValidationMessage = true;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function _register(e: Event) {
        try {
            e.preventDefault();
            isLoading = true;
            if (!_isValid()) {
                return;
            }

            const res = await Api.request("POST", "clinic_signup", formData);

            if (res.ok) {
                return goto("/register");
            }

            if (res.status === 422) {
                const body = await res.json();
                showValidationMessage = true;
                validationMessage = body.status.message;
            }
        } catch (error) {
            console.log(error);
        } finally {
            isLoading = false;
        }
    }

    function _isValid(): boolean {
        if (formIsValid) {
            showValidationMessage = false;
            validationMessage = "";
            return true;
        }
        showValidationMessage = true;

        if (!emailValid) {
            validationMessage = `${$LL.Email()} ${$LL.PasswordValidation()}`;
        }
        if (!passwordValid) {
            validationMessage = $LL.PasswordValidation();
        }
        if (state == SignInState.register && !passwordsMatch) {
            validationMessage = $LL.PasswordsDoNotMatch();
        }
        return false;
    }

    function _handleKeyDown(e: any) {
        if (formIsValid) {
            if (e.keyCode === 13) {
                _register(e);
            }
        }
        return null;
    }
</script>

<svelte:window on:keydown={_handleKeyDown} />

<form class="flex flex-col space-y-6" on:submit={_submit}>
    <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
        {#if state == SignInState.login}
            {$LL.Signin()}
        {:else}
            {$LL.RegisterToOurPlatform()}
        {/if}
    </h3>
    <FloatingLabelInput
        bind:value={email}
        style="outlined"
        id="email"
        name="email"
        type="text"
        label={$LL.Email()}
        required
    />
    <FloatingLabelInput
        bind:value={password}
        style="outlined"
        id="password"
        name="password"
        type="password"
        label={$LL.Password()}
        required
    />
    {#if state == SignInState.register}
        <FloatingLabelInput
            bind:value={confirmPassword}
            style="outlined"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label={$LL.ConfirmPassword()}
            required
        />
    {/if}

    {#if state == SignInState.login}
        <div class="flex items-start">
            <Checkbox>{$LL.RememberMe()}</Checkbox>
            <a
                href="/"
                class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                >Lost password?</a
            >
        </div>
    {/if}

    <div class="flex items-center">
        {#if state == SignInState.login}
            <button type="button" on:click={_toggleState} class="">
                <small class="text-blue-700 hover:text-blue-500"
                    >{$LL.NotAMemberYet()}
                </small>
            </button>
        {:else}
            <button type="button" on:click={_toggleState} class="">
                <small class="text-blue-700 hover:text-blue-500">
                    {$LL.AlreadyAMember()}
                </small>
            </button>
        {/if}
    </div>

    <Button type="submit" class="w-full1">
        {#if isLoading}
            <Spinner class="mr-3" size="4" />
        {/if}

        {#if state == SignInState.login}
            {$LL.Signin()}
        {:else}
            {$LL.Signup()}
        {/if}
    </Button>
    {#if showValidationMessage}
        <small class="text-red-500">* {validationMessage}</small>
    {/if}
</form>
