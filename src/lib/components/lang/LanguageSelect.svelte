<script lang="ts">
  import { AuthStatus } from "$lib/enums/auth_status";
  import LL, { locale, setLocale } from "$lib/i18n/i18n-svelte";
  import type { Locales } from "$lib/i18n/i18n-types";
  import { loadLocaleAsync } from "$lib/i18n/i18n-util.async";
  import { Api } from "$lib/utils/api";
  import { authStatus } from "$lib/utils/auth";
  import Cookies from "js-cookie";
  import LanguageRadio from "./LanguageRadio.svelte";

  //! TODO: fetch available locales

  async function updateUserSettings(newLocale: Locales) {
    try {
      const data = {
        user_language: {
          language: newLocale.toString(),
        },
      };
      await Api.request("PATCH", "change_language", data);
    } catch (error) {
      console.log(error);
    }
  }

  const switchLocale = async (newLocale: Locales) => {
    if (!newLocale || $locale === newLocale) return;
    // load new dictionary from server
    await loadLocaleAsync(newLocale);
    setLocale(newLocale);
    Cookies.set("language", newLocale);
    // update `lang` attribute in html
    const doc = document.querySelector<HTMLElement>("html");
    if (doc) {
      doc.setAttribute("language", newLocale);
    }
    // update user settings if logged in
    if ($authStatus == AuthStatus.authenticated) {
      await updateUserSettings(newLocale);
    }
  };

  const onChange = async (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    if (target.value) {
      await switchLocale(target.value as Locales);
    }
  };
</script>

<p class="mb-5 text-lg font-medium text-gray-900 dark:text-white">
  {$LL.ChooseLanguage}
</p>
<div class="grid gap-2 w-full md:grid-cols-5">
  <LanguageRadio {onChange} countryCode="en" name="🇬🇧 English" />
  <LanguageRadio {onChange} countryCode="de" name="🇩🇪 German" />
  <!-- <LanguageRadio {onChange} countryCode="fr" name="🇫🇷 Français" /> -->
  <!-- <LanguageRadio {onChange} countryCode="hu" name="🇭🇺 Magyar" /> 
  <LanguageRadio {onChange} countryCode="es" name="🇪🇸 Español" />
  <LanguageRadio {onChange} countryCode="it" name="🇮🇹 Italiano" /> -->
</div>
