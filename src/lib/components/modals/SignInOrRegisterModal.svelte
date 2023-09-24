<script lang="ts">
  import { Api } from "$lib/utils/api";
  import { isEmail, isPassword } from "$lib/utils/validation";
  import {
    Button,
    Modal,
    FloatingLabelInput,
    Spinner,
    Checkbox,
  } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import Cookies from "js-cookie";
  import LL from "$lib/i18n/i18n-svelte";
  import { setTokenCookie, authStatus } from "$lib/utils/auth";
  import { username } from "$lib/utils/username";
  import { SignInModalState } from "$lib/enums/sign_in_modal_state";
  import { AuthStatus } from "$lib/enums/auth_status";
    import type { User } from "$lib/models/user";

  export let showModal: boolean;
  export let state: SignInModalState;

  let email: string = "dankollner12@gmail.com";
  let password: string = "Test2021";
  let confirmPassword: string;
  let validationMessage: string;
  let showValidationMessage: boolean;
  let isLoading: boolean = false;

  $: language = Cookies.get("language") ?? "en";
  $: emailValid = isEmail(email);
  $: passwordValid = isPassword(password);
  $: passwordsMatch = password == confirmPassword;
  $: formIsValid =
    (emailValid && passwordValid && state == SignInModalState.login) ||
    passwordsMatch;
  $: formData = {
    user: {
      email,
      password,
      language,
    },
  };

  function _toggleState() {
    if (state == SignInModalState.login) {
      state = SignInModalState.register;
    } else {
      state = SignInModalState.login;
    }
  }

  async function _submit(e: Event) {
    if (state === SignInModalState.login) {
      _logIn(e);
    } else {
      _register(e);
    }
  }

  async function _logIn(e: Event) {
    try {
      e.preventDefault();

      const data = {
        user: {
          email,
          password,
        },
      };

      if (_isValid() == false) {
        return;
      }
      const res = await Api.request("POST", "login", data);
      if (res.ok) {
        const token: string | null = res.headers.get("Authorization");
        setTokenCookie(token);
        const user: User = await res.json();
        $username = user.email;
        $authStatus = AuthStatus.authenticated;
        showModal = false;
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

      const res = await Api.request("POST", "signup", formData);

      if (res.ok) {
        showModal = false;
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
    if (state == SignInModalState.register && !passwordsMatch) {
      validationMessage = $LL.PasswordsDoNotMatch();
    }
    return false;
  }

  function _handleKeyDown(e: any) {
    if (showModal && formIsValid) {
      if (e.keyCode === 13) {
        _register(e);
      }
    }
    return null;
  }
</script>

<svelte:window on:keydown={_handleKeyDown} />

<Modal bind:open={showModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" on:submit={_submit}>
    <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
      {#if state == SignInModalState.login}
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
    {#if state == SignInModalState.register}
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

    {#if state == SignInModalState.login}
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
      {#if state == SignInModalState.login}
        <button type="button" on:click={_toggleState} class="">
          <small>{$LL.NotAMemberYet()} </small>
        </button>
      {:else}
        <button type="button" on:click={_toggleState} class="">
          <small> {$LL.AlreadyAMember()} </small>
        </button>
      {/if}
    </div>

    <Button type="submit" class="w-full1">
      {#if isLoading}
        <Spinner class="mr-3" size="4" />
      {/if}

      {#if state == SignInModalState.login}
        {$LL.Signin()}
      {:else}
        {$LL.Signup()}
      {/if}
    </Button>
    {#if showValidationMessage}
      <small class="text-red-500">* {validationMessage}</small>
    {/if}
  </form>
</Modal>
